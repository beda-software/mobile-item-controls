import {
    QuestionItemProps,
    useFieldController,
    getFieldErrorMessage,
} from '@beda.software/fhir-questionnaire';
import React, { useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { renderText } from '../../components/TextRender';
import { styles } from '../styles';

export function TextControl({ questionItem, parentPath }: QuestionItemProps) {
    const inputRef = useRef<TextInput>(null);
    const { linkId, rowsNumber = 3 } = questionItem;
    const fieldName = [...parentPath, linkId, 0, 'value', 'string'];

    const field = useFieldController<string>(fieldName, questionItem);
    const { value, onChange, fieldState } = field;
    const error = getFieldErrorMessage(field, fieldState, questionItem.text);

    function focusRef() {
        inputRef.current?.focus();
    }

    if (questionItem.hidden) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {renderText(questionItem.text, styles.text)}
                {renderText(questionItem.helpText)}
            </View>

            <TouchableOpacity
                activeOpacity={1}
                onPress={focusRef}
                style={styles.inputContainer}
            >
                <TextInput
                    ref={inputRef}
                    style={[styles.inputText, { minHeight: rowsNumber * 22 }]}
                    value={value}
                    onChangeText={onChange}
                    multiline
                />
            </TouchableOpacity>
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
    );
}
