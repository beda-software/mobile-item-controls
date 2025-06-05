import React, { useRef, useState } from 'react';

import {
    getFieldErrorMessage,
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { Text, TextInput, View } from 'react-native';

import { renderText } from '../../components/TextRender';
import { S, styles } from '../styles';

export function TextControl({ questionItem, parentPath }: QuestionItemProps) {
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
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {renderText(questionItem.text, styles.text)}
                {renderText(questionItem.helpText)}
            </View>
            <S.InputWrapper
                activeOpacity={1}
                onPress={focusRef}
                $readOnly={readOnly}
                $active={isFocused}
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
            </S.InputWrapper>
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
    );
}
