import React from 'react';

import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { FormAnswerItems } from 'sdc-qrf';

import { useControlConfig } from '../../control-config';
import { BaseControl, emptyText } from '../BaseControl';
import { S } from '../styles';
import { formatAnswers } from './utils';

export function ReadonlyControl(props: QuestionItemProps) {
    const { questionItem, parentPath } = props;
    const { linkId, type } = questionItem;
    const config = useControlConfig();

    const { value: rawValue } = useFieldController<FormAnswerItems[]>(
        [...parentPath, linkId],
        questionItem
    );

    if (type === 'display') {
        return (
            <BaseControl {...props} customLayout>
                <></>
            </BaseControl>
        );
    }

    const answers: FormAnswerItems[] | undefined = Array.isArray(rawValue)
        ? rawValue
        : undefined;

    const displayValue = formatAnswers(answers, type, config);

    return (
        <BaseControl {...props}>
            <S.ContentQuestionValue>
                {displayValue || emptyText}
            </S.ContentQuestionValue>
        </BaseControl>
    );
}
