import React, { useRef, useState } from 'react';

import {
    getFieldErrorMessage,
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { TextInput } from 'react-native';

import { BaseControl } from '../BaseControl';
import { S } from '../styles';

export function IntegerInput(props: QuestionItemProps) {
    const { questionItem, parentPath } = props;
    const inputRef = useRef<TextInput>(null);
    const { linkId, readOnly } = questionItem;

    const field = useFieldController<number>(
        [...parentPath, linkId, 0, 'value', 'integer'],
        questionItem
    );
    const { value, onChange, fieldState } = field;
    const error = getFieldErrorMessage(field, fieldState, questionItem.text);

    const [isFocused, setIsFocused] = useState(false);

    function focusRef() {
        inputRef.current?.focus();
    }

    const onChangeText = (inputValue: string) => {
        const parsedValue = parseInt(inputValue, 10);
        onChange(!Number.isNaN(parsedValue) ? parsedValue : undefined);
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
                placeholder={questionItem.helpText}
                value={value?.toString() || ''}
                onChangeText={onChangeText}
                keyboardType={'numeric'}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                editable={!readOnly}
                $readOnly={readOnly}
            />
        </BaseControl>
    );
}
