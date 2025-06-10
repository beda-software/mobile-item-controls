import React, { useRef, useState } from 'react';

import {
    getFieldErrorMessage,
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { TextInput } from 'react-native';

import { BaseControl } from '../BaseControl';
import { S } from '../styles';
import { isValidDecimal } from '../utils';

export function DecimalInput(props: QuestionItemProps) {
    const { questionItem, parentPath } = props;
    const inputRef = useRef<TextInput>(null);
    const { linkId, readOnly } = questionItem;

    const field = useFieldController<number>(
        [...parentPath, linkId, 0, 'value', 'decimal'],
        questionItem
    );
    const { value, onChange, fieldState } = field;
    const error = getFieldErrorMessage(field, fieldState, questionItem.text);

    const [inputValue, setInputValue] = useState(value?.toString() || '');
    const [isFocused, setIsFocused] = useState(false);

    function focusRef() {
        inputRef.current?.focus();
    }

    const onChangeText = (text: string) => {
        if (isValidDecimal(text)) {
            setInputValue(text);
            const parsedValue = parseFloat(text);
            onChange(!Number.isNaN(parsedValue) ? parsedValue : undefined);
        }
    };

    return (
        <BaseControl
            {...props}
            onFocus={focusRef}
            isActive={isFocused}
            error={error}
        >
            <S.TextInput
                ref={inputRef}
                keyboardType={'decimal-pad'}
                value={inputValue}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                editable={!readOnly}
                $readOnly={readOnly}
            />
        </BaseControl>
    );
}
