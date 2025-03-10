import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import React, { useContext, useRef } from 'react';
import {
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { renderText } from '../../components/TextRender';
import { PagerViewContext } from '../context';
import { IntegerInputStyles, WidgetStyles } from '../types';
import { Widget } from '../Widget';

interface Props extends QuestionItemProps {
    useWidget?: boolean;
    styles?: {
        widget?: WidgetStyles;
        integerInput?: IntegerInputStyles;
    };
}

export function IntegerInput({
    questionItem,
    parentPath,
    useWidget = true,
    styles,
}: Props) {
    const inputRef = useRef<TextInput>(null);
    const navigation = useContext(PagerViewContext);

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

    const content = (
        <View>
            <View>
                {!useWidget ? renderText(questionItem.text) : null}
                {renderText(questionItem.helpText)}
            </View>
            <TouchableOpacity
                activeOpacity={1}
                onPress={focusRef}
                style={
                    styles?.integerInput?.container ??
                    defaultStyles.inputContainer
                }
            >
                <TextInput
                    ref={inputRef}
                    placeholder={questionItem.helpText}
                    multiline
                    style={styles?.integerInput?.value ?? defaultStyles.input}
                    value={value?.toString() || ''}
                    onChangeText={onChangeText}
                    keyboardType={'numeric'}
                />
            </TouchableOpacity>
        </View>
    );

    if (useWidget) {
        return (
            <Widget
                title={questionItem.text!}
                nextDisabled={value === undefined}
                onPressNext={value !== undefined ? navigation?.next : focusRef}
                widgetStyles={styles?.widget}
            >
                <ScrollView bounces={false}>{content}</ScrollView>
            </Widget>
        );
    }

    return content;
}

const defaultStyles = StyleSheet.create({
    input: {
        fontSize: 16,
        width: '100%',
    },
    inputContainer: {
        borderRadius: 16,
        width: '100%',
        backgroundColor: 'white',
        padding: 16,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
