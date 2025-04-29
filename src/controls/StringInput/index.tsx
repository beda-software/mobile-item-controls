import {
    QuestionItemProps,
    useFieldController,
    getFieldErrorMessage,
} from '@beda.software/fhir-questionnaire';
import React, { useRef } from 'react';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';
import { renderText } from '../../components/TextRender';
import { styles } from '../styles';

export function StringInput({ questionItem, parentPath }: QuestionItemProps) {
    const inputRef = useRef<TextInput>(null);

    const field = useFieldController<string>(
        [...parentPath, questionItem.linkId, 0, 'value', 'string'],
        questionItem
    );
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
                    multiline
                    style={styles.inputText}
                    value={value}
                    onChangeText={onChange}
                />
            </TouchableOpacity>
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
    );
}
