import React, { useRef, useState } from 'react';

import {
    getFieldErrorMessage,
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { TextInput } from 'react-native';

import { BaseControl } from '../BaseControl';
import { S } from '../styles';

export function TextControl(props: QuestionItemProps) {
    const { questionItem, parentPath } = props;
    const inputRef = useRef<TextInput>(null);
    const { linkId, rowsNumber = 3, readOnly = false } = questionItem;
    const fieldName = [...parentPath, linkId, 0, 'value', 'string'];

    const [isFocused, setIsFocused] = useState(false);

    const field = useFieldController<string>(fieldName, questionItem);
    const { value, onChange, fieldState } = field;
    const error = getFieldErrorMessage(field, fieldState, questionItem.text);

    function focusRef() {
        if (readOnly) {
            return;
        }

        inputRef.current?.focus();
    }

    return (
        <BaseControl
            {...props}
            onFocus={focusRef}
            isActive={isFocused}
            error={error}
        >
            <S.TextInput
                ref={inputRef}
                style={[{ minHeight: rowsNumber * 22 }]}
                value={value}
                onChangeText={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                multiline
                editable={!readOnly}
                $readOnly={readOnly}
            />
        </BaseControl>
    );
}
