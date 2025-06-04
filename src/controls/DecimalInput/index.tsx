import React, { useRef, useState } from 'react';

import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { Text, TextInput, View } from 'react-native';

import { renderText } from '../../components/TextRender';
import { S, styles } from '../styles';
import { isValidDecimal } from '../utils';

export function DecimalInput({ questionItem, parentPath }: QuestionItemProps) {
    const inputRef = useRef<TextInput>(null);
    const { linkId, unit, readOnly } = questionItem;

    const { value, onChange } = useFieldController<number>(
        [...parentPath, linkId, 0, 'value', 'decimal'],
        questionItem
    );

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

    if (questionItem.hidden) {
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
                $active={isFocused}
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
            </S.InputWrapper>
            {unit?.display && <Text>{unit.display}</Text>}
        </View>
    );
}
