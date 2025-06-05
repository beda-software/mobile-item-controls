import React, { useRef, useState } from 'react';

import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { Text, TextInput, View } from 'react-native';

import { renderText } from '../../components/TextRender';
import { S, styles } from '../styles';

export function IntegerInput({ questionItem, parentPath }: QuestionItemProps) {
    const inputRef = useRef<TextInput>(null);
    const { linkId, unit, readOnly } = questionItem;

    const { value, onChange } = useFieldController<number>(
        [...parentPath, linkId, 0, 'value', 'integer'],
        questionItem
    );

    const [isFocused, setIsFocused] = useState(false);

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
            <S.InputWrapper
                activeOpacity={1}
                onPress={focusRef}
                $readOnly={readOnly}
                $active={isFocused}
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
            </S.InputWrapper>
            {unit && <Text>{unit.display}</Text>}
        </View>
    );
}
