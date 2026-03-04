import React from 'react';

import {
    getFieldErrorMessage,
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';

import { CalendarControl } from '../../components/Calendar';
import { BaseControl } from '../BaseControl';

export function CalendarInput(props: QuestionItemProps) {
    const { questionItem, parentPath } = props;
    const { linkId, type } = questionItem;
    const fieldPath = [...parentPath, linkId, 0, 'value', type];
    const field = useFieldController<string>(fieldPath, questionItem);
    const { value, onChange, fieldState } = field;
    const error = getFieldErrorMessage(field, fieldState, questionItem.text);

    return (
        <BaseControl {...props} error={error} customLayout>
            <CalendarControl value={value} onChange={onChange} />
        </BaseControl>
    );
}
