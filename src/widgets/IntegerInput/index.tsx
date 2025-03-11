import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import React, { useRef } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import { renderText } from '../../components/TextRender';
import { styles } from '../styles';

export function IntegerInput({ questionItem, parentPath }: QuestionItemProps) {
    const inputRef = useRef<TextInput>(null);

    const { value, onChange } = useFieldController<number>(
        [...parentPath, questionItem.linkId, 0, 'value', 'integer'],
        questionItem
    );

    function focusRef() {
        inputRef.current?.focus();
    }

    const onChangeText = (inputValue: string) => {
        const parsedValue = parseInt(inputValue, 10);
        onChange(!Number.isNaN(parsedValue) ? parsedValue : undefined);
    };

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
                    placeholder={questionItem.helpText}
                    multiline
                    style={styles.inputText}
                    value={value?.toString() || ''}
                    onChangeText={onChangeText}
                    keyboardType={'numeric'}
                />
            </TouchableOpacity>
        </View>
    );
}
