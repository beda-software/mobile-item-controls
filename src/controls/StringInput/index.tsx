import React, { useRef } from 'react';

import {
    QuestionItemProps,
    useFieldController,
    getFieldErrorMessage,
} from '@beda.software/fhir-questionnaire';
import { TextInput, View, Text } from 'react-native';

import { renderText } from '../../components/TextRender';
import { S, styles } from '../styles';

export function StringInput({ questionItem, parentPath }: QuestionItemProps) {
    const inputRef = useRef<TextInput>(null);
    const { linkId, hidden, readOnly = false } = questionItem;

    const field = useFieldController<string>(
        [...parentPath, linkId, 0, 'value', 'string'],
        questionItem
    );
    const { value, onChange, fieldState } = field;

    const error = getFieldErrorMessage(field, fieldState, questionItem.text);

    function focusRef() {
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
                    multiline
                    value={value}
                    onChangeText={onChange}
                    editable={!readOnly}
                    $readOnly={readOnly}
                />
            </S.InputWrapper>
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
    );
}
