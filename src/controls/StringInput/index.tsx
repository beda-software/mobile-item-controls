import React, { useRef, useState } from 'react';

import {
    getFieldErrorMessage,
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { Text, TextInput, View } from 'react-native';

import { renderText } from '../../components/TextRender';
import { S, styles } from '../styles';

export function StringInput({ questionItem, parentPath }: QuestionItemProps) {
    const inputRef = useRef<TextInput>(null);
    const { linkId, readOnly = false } = questionItem;

    const [isFocused, setIsFocused] = useState(false);

    const field = useFieldController<string>(
        [...parentPath, linkId, 0, 'value', 'string'],
        questionItem
    );
    const { value, onChange, fieldState } = field;

    const error = getFieldErrorMessage(field, fieldState, questionItem.text);

    function focusRef() {
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
                    value={value}
                    onChangeText={onChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    editable={!readOnly}
                    $readOnly={readOnly}
                />
            </S.InputWrapper>
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
    );
}
