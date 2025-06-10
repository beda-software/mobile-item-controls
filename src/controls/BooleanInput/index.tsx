import React from 'react';

import {
    getFieldErrorMessage,
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { Switch } from 'react-native';

import { BaseControl } from '../BaseControl';

export function BooleanInput(props: QuestionItemProps) {
    const { questionItem, parentPath } = props;
    const { linkId } = questionItem;
    const fieldName = [...parentPath, linkId, 0, 'value', 'boolean'];
    const field = useFieldController<boolean>(fieldName, questionItem);
    const { value, onChange, fieldState } = field;
    const error = getFieldErrorMessage(field, fieldState, questionItem.text);

    return (
        <BaseControl {...props} error={error}>
            <Switch value={Boolean(value)} onValueChange={onChange} />
        </BaseControl>
    );
}
