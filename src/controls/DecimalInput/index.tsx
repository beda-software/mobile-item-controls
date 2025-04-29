import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import React, { useRef, useState } from 'react';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';
import { renderText } from '../../components/TextRender';
import { styles } from '../styles';
import { isValidDecimal } from '../utils';

export function DecimalInput({ questionItem, parentPath }: QuestionItemProps) {
    const inputRef = useRef<TextInput>(null);
    const { linkId, unit } = questionItem;

    const { value, onChange } = useFieldController<number>(
        [...parentPath, linkId, 0, 'value', 'decimal'],
        questionItem
    );

    const [inputValue, setInputValue] = useState(value?.toString() || '');

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
                    keyboardType={'decimal-pad'}
                    style={styles.inputText}
                    value={inputValue}
                    onChangeText={onChangeText}
                />
            </TouchableOpacity>

            {unit?.display && <Text>{unit.display}</Text>}
        </View>
    );
}
