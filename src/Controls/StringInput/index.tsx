import { useContext, useRef } from 'react';

import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import {
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';

import { PagerViewContext } from '../context';
import { Widget } from '../Widget';
import { StringInputStyles, WidgetStyles } from '../types';

interface Styles {
    widget?: WidgetStyles;
    stringInput?: StringInputStyles;
}

interface Props extends QuestionItemProps {
    styles?: Styles;
}

export function StringInput(props: Props) {
    const { questionItem, parentPath } = props;

    const inputRef = useRef<TextInput>(null);
    const navigation = useContext(PagerViewContext);

    const { value, onChange } = useFieldController<string>(
        [...parentPath, questionItem.linkId, 0, 'value', 'string'],
        questionItem
    );

    function focusRef() {
        if (inputRef && inputRef.current) {
            inputRef.current.focus();
        }
    }

    return (
        <Widget
            title={questionItem.text!}
            nextDisabled={false}
            onPressNext={
                value ? navigation?.next : () => inputRef.current?.focus()
            }
            widgetStyles={props.styles?.widget}
        >
            <ScrollView bounces={false}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => focusRef()}
                    style={
                        props.styles?.stringInput?.container ??
                        styles.inputContainer
                    }
                >
                    <TextInput
                        ref={inputRef}
                        placeholder={questionItem.helpText}
                        multiline
                        style={props.styles?.stringInput?.value ?? styles.input}
                        value={value}
                        onChangeText={onChange}
                    />
                </TouchableOpacity>
            </ScrollView>
        </Widget>
    );
}

const styles = StyleSheet.create({
    input: {
        fontSize: 16,
        width: '100%',
    },
    inputContainer: {
        borderRadius: 16,
        width: '100%',
        backgroundColor: 'white',
        minHeight: 200,
        padding: 24,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
});
