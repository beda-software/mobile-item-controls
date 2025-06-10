import React, { useEffect, useState } from 'react';

import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import _ from 'lodash';
import { FCEQuestionnaireItemChoiceColumn, FormAnswerItems } from 'sdc-qrf';
import { getDisplay } from 'src/utils';

import { GetFHIRResources, useReferences } from './hooks';
import { Select } from '../../components/Select';
import { BaseControl } from '../BaseControl';

export function ReferenceControl(
    props: QuestionItemProps,
    getFHIRResources: GetFHIRResources
) {
    const { answerExpression, choiceColumn, linkId } = props.questionItem;

    if (!answerExpression || !choiceColumn) {
        console.warn(
            `answerExpression and choiceColumn must be set for linkId '${linkId}'`
        );
        return null;
    }

    return <ReferenceInput {...props} getFHIRResources={getFHIRResources} />;
}

function ReferenceInput(
    props: QuestionItemProps & { getFHIRResources: GetFHIRResources }
) {
    const { parentPath, questionItem } = props;

    const references = useReferences(props, props.getFHIRResources);
    const { repeats, text, linkId, choiceColumn, entryFormat } = questionItem;

    const fieldName = [...parentPath, linkId];

    const { value, onMultiChange } = useFieldController<FormAnswerItems[]>(
        fieldName,
        questionItem
    );

    return (
        <BaseControl {...props}>
            <ReferenceInputSelect
                loadOptions={references.loadOptions}
                value={value}
                onChange={onMultiChange}
                repeats={repeats}
                placeholder={entryFormat}
                choiceColumn={choiceColumn}
                label={text}
            />
        </BaseControl>
    );
}

interface ReferenceInputSelectProps {
    loadOptions: (search: string) => Promise<FormAnswerItems[]>;
    value: FormAnswerItems[] | undefined;
    label?: string;
    onChange: (option: any) => void;
    repeats?: boolean;
    placeholder?: string;
    choiceColumn?: FCEQuestionnaireItemChoiceColumn[];
}

function ReferenceInputSelect(props: ReferenceInputSelectProps) {
    const {
        value,
        onChange,
        loadOptions,
        repeats = false,
        placeholder = `Select...`,
        choiceColumn,
        label,
    } = props;

    const debouncedLoadOptions = _.debounce((searchText: string) => {
        loadOptions(searchText).then(setOptions);
    }, 500);

    const [options, setOptions] = useState<FormAnswerItems[]>([]);

    useEffect(() => {
        (async () => {
            const newOptions = await loadOptions('');
            setOptions(newOptions);
        })();
    }, [loadOptions]);

    return (
        <Select<FormAnswerItems>
            value={value}
            options={options}
            onChange={(v) => onChange(v)}
            onSearch={debouncedLoadOptions}
            isMulti={repeats}
            getOptionLabel={(o) =>
                (getDisplay(o.value, choiceColumn) as string) || ''
            }
            placeholder={placeholder}
            label={label}
        />
    );
}
