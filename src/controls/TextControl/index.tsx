import React, { useRef } from 'react';

import {
    QuestionItemProps,
    useFieldController,
    getFieldErrorMessage,
} from '@beda.software/fhir-questionnaire';
import { View, Text, TextInput } from 'react-native';

import { renderText } from '../../components/TextRender';
import { S, styles } from '../styles';

export function TextControl({ questionItem, parentPath }: QuestionItemProps) {
    const inputRef = useRef<TextInput>(null);
    const { linkId, rowsNumber = 3, hidden, readOnly = false } = questionItem;
    const fieldName = [...parentPath, linkId, 0, 'value', 'string'];

    const field = useFieldController<string>(fieldName, questionItem);
    const { value, onChange, fieldState } = field;
    const error = getFieldErrorMessage(field, fieldState, questionItem.text);

    function focusRef() {
        if (readOnly) {
            return;
        }

        inputRef.current?.focus();
    }

    if (hidden) {
        return null;
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
            >
                <S.TextInput
                    ref={inputRef}
                    style={[{ minHeight: rowsNumber * 22 }]}
                    value={value}
                    onChangeText={onChange}
                    multiline
                    editable={!readOnly}
                    $readOnly={readOnly}
                />
            </S.InputWrapper>
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
    );
}
