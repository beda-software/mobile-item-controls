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
import { StringInputStyles, WidgetStyles } from '../types';
import { Widget } from '../Widget';

interface Props extends QuestionItemProps {
    useWidget?: boolean;
    styles?: {
        widget?: WidgetStyles;
        stringInput?: StringInputStyles;
    };
}

export function StringInput({
    questionItem,
    parentPath,
    useWidget = true,
    styles,
}: Props) {
    const inputRef = useRef<TextInput>(null);
    const navigation = useContext(PagerViewContext);

    const { value, onChange } = useFieldController<string>(
        [...parentPath, questionItem.linkId, 0, 'value', 'string'],
        questionItem
    );

    function focusRef() {
        inputRef.current?.focus();
    }

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
                    styles?.stringInput?.container ??
                    defaultStyles.inputContainer
                }
            >
                <TextInput
                    ref={inputRef}
                    placeholder={questionItem.helpText}
                    multiline
                    style={styles?.stringInput?.value ?? defaultStyles.input}
                    value={value}
                    onChangeText={onChange}
                />
            </TouchableOpacity>
        </View>
    );

    if (useWidget) {
        return (
            <Widget
                title={questionItem.text!}
                nextDisabled={!value}
                onPressNext={value ? navigation?.next : focusRef}
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
