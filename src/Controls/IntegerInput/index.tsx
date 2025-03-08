import React, { useContext, useRef } from 'react';

import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import {
    ScrollView,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { PagerViewContext } from '../context';
import { Widget } from '../Widget';
import { WidgetStyles, InteferInputStyles } from '../types';

interface Styles {
    widget?: WidgetStyles;
    inteferInput?: InteferInputStyles;
}

interface Props extends QuestionItemProps {
    styles?: Styles;
}

export function IntegerInput(props: Props) {
    const { questionItem, parentPath } = props;

    const inputRef = useRef<TextInput>(null);
    const navigation = useContext(PagerViewContext);

    const { value, onChange } = useFieldController<number>(
        [...parentPath, questionItem.linkId, 0, 'value', 'integer'],
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
        >
            <ScrollView bounces={false}>
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={() => focusRef()}
                    style={
                        props.styles?.inteferInput?.container ??
                        styles.inputContainer
                    }
                >
                    <TextInput
                        ref={inputRef}
                        placeholder={questionItem.helpText}
                        style={
                            props.styles?.inteferInput?.value ?? styles.input
                        }
                        value={value?.toString()}
                        onChangeText={(userInput) =>
                            onChange(
                                !Number.isNaN(parseInt(userInput, 10))
                                    ? parseInt(userInput, 10)
                                    : undefined
                            )
                        }
                        keyboardType={'numeric'}
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
