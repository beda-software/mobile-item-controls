import React, { useRef, useState } from 'react';

import {
    getFieldErrorMessage,
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { TextInput } from 'react-native';

import { BaseControl } from '../BaseControl';
import { S } from '../styles';

export function StringInput(props: QuestionItemProps) {
    const { questionItem, parentPath } = props;
    const inputRef = useRef<TextInput>(null);
    const { linkId, readOnly = false } = questionItem;

    const [isFocused, setIsFocused] = useState(false);

    const field = useFieldController<string>(
        [...parentPath, linkId, 0, 'value', 'string'],
        questionItem
    );
    const { value, onChange, fieldState } = field;

    const error = getFieldErrorMessage(field, fieldState, questionItem.text);

    function focusRef() {
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
                value={value}
                onChangeText={onChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                editable={!readOnly}
                $readOnly={readOnly}
            />
        </BaseControl>
    );
}
