import { ParametersParameter, Questionnaire, QuestionnaireResponse } from 'fhir/r4b';
import _ from 'lodash';
import {
    calcInitialContext,
    FCEQuestionnaireItem,
    FormAnswerItems,
    FormItems,
    getEnabledQuestions,
    mapResponseToForm,
    toFirstClassExtension,
} from 'sdc-qrf';

import { formatAnswers, ReadonlyControlConfig } from '../../readonly-controls';

/**
 * Output-agnostic document model of a rendered QuestionnaireResponse.
 *
 * `questionnaireResponseToDocument` walks the questionnaire exactly like the
 * readonly form (same enableWhen/hidden filtering, same value formatting via
 * `formatAnswers`), but yields plain data instead of React or HTML. Any renderer
 * (HTML, React Native, plain text, …) can then consume the tree — see
 * `documentToHtml` for the bundled HTML renderer.
 */
export type DocumentNode = DocumentGroupNode | DocumentFieldNode | DocumentDisplayNode;

export interface DocumentGroupNode {
    kind: 'group';
    linkId: string;
    text?: string;
    repeats?: boolean;
    children: DocumentNode[];
}

export interface DocumentFieldNode {
    kind: 'field';
    linkId: string;
    text?: string;
    /** Questionnaire item type (string, choice, quantity, …). */
    type: string;
    /** Answer(s) formatted identically to the readonly form; '' when unanswered. */
    value: string;
}

export interface DocumentDisplayNode {
    kind: 'display';
    linkId: string;
    text?: string;
}

export interface QuestionnaireResponseToDocumentParams {
    questionnaire: Questionnaire;
    questionnaireResponse: QuestionnaireResponse;
    launchContext?: ParametersParameter[];
    /**
     * Date/time formatters, injected so the package stays free of app-level date
     * utilities. Pass the same formatters the readonly form uses to keep the
     * output byte-identical; omitted formatters fall back to the raw ISO string.
     */
    config?: ReadonlyControlConfig;
}

const identity = (isoString: string): string => isoString;

export function questionnaireResponseToDocument({
    questionnaire,
    questionnaireResponse,
    launchContext = [],
    config,
}: QuestionnaireResponseToDocumentParams): DocumentNode[] {
    const resolvedConfig: Required<ReadonlyControlConfig> = {
        formatDate: config?.formatDate ?? identity,
        formatDateTime: config?.formatDateTime ?? identity,
        formatTime: config?.formatTime ?? identity,
    };

    const fceQuestionnaire = toFirstClassExtension(questionnaire);
    const formValues = mapResponseToForm(questionnaireResponse, questionnaire);
    const context = calcInitialContext(
        {
            fceQuestionnaire,
            questionnaire,
            questionnaireResponse,
            launchContextParameters: launchContext,
        },
        formValues,
    );

    // Mirrors sdc-qrf's QuestionItems/GroupComponent: read answers from the global
    // formValues by path, and use getEnabledQuestions (+ item.hidden) so the exact
    // same items the form shows are the ones we emit.
    function buildField(item: FCEQuestionnaireItem, parentPath: string[]): DocumentFieldNode {
        const answers = _.get(formValues, [...parentPath, item.linkId!]) as FormAnswerItems[] | undefined;
        return {
            kind: 'field',
            linkId: item.linkId!,
            text: item.text,
            type: item.type,
            value: formatAnswers(answers, item.type, resolvedConfig),
        };
    }

    function buildGroup(item: FCEQuestionnaireItem, parentPath: string[]): DocumentGroupNode {
        // Repeating groups store an array of FormItems (one per repeat) under `items`;
        // non-repeating groups store a single FormItems. Build child parentPaths
        // verbatim from GroupComponent so value lookups line up with the form.
        const childPaths: string[][] = item.repeats
            ? ((_.get(formValues, [...parentPath, item.linkId!, 'items']) as FormItems[] | undefined)?.length
                  ? (_.get(formValues, [...parentPath, item.linkId!, 'items']) as FormItems[])
                  : [{}]
              ).map((_group, index) => [...parentPath, item.linkId!, 'items', String(index)])
            : [[...parentPath, item.linkId!, 'items']];

        const children = item.item?.length
            ? childPaths.flatMap((childPath) => buildItems(item.item!, childPath))
            : [];

        return {
            kind: 'group',
            linkId: item.linkId!,
            text: item.text,
            repeats: item.repeats,
            children,
        };
    }

    function buildItems(items: FCEQuestionnaireItem[], parentPath: string[]): DocumentNode[] {
        return getEnabledQuestions(items, parentPath, formValues, context)
            .filter((item) => !item.hidden)
            .map((item) => {
                if (item.type === 'group') {
                    return buildGroup(item, parentPath);
                }
                if (item.type === 'display') {
                    return { kind: 'display', linkId: item.linkId!, text: item.text } satisfies DocumentDisplayNode;
                }
                return buildField(item, parentPath);
            });
    }

    return buildItems(fceQuestionnaire.item ?? [], []);
}
