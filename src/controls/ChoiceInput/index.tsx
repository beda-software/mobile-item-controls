import React from 'react';

import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from '../styles';
import { renderText } from '../../components/TextRender';

type QuestionnaireItemAnswerOption = NonNullable<
    QuestionItemProps['questionItem']['answerOption']
>[0];
type QuestionnaireItemAnswerOptionValue = NonNullable<
    QuestionnaireItemAnswerOption['value']
>;
type Coding = NonNullable<QuestionnaireItemAnswerOptionValue['Coding']>;

export function ChoiceInput({ questionItem, parentPath }: QuestionItemProps) {
    const { repeats } = questionItem;

    const { value, onChange, onMultiChange } = useFieldController<
        Coding | QuestionnaireItemAnswerOption[]
    >(
        repeats
            ? [...parentPath, questionItem.linkId]
            : [...parentPath, questionItem.linkId, 0, 'value', 'Coding'],
        questionItem
    );

    function onSelect(option: QuestionnaireItemAnswerOption) {
        repeats ? onMultiChange(option) : onChange(option.value?.Coding);
    }

    return (
        <View style={styles.container}>
            <View>{renderText(questionItem.text, styles.text)}</View>
            {questionItem.answerOption?.map((option, index) => (
                <ChoiceOption
                    key={index}
                    isSelected={isOptionSelected(option, value, repeats)}
                    onSelect={() => onSelect(option)}
                    display={option.value?.Coding?.display}
                />
            ))}
        </View>
    );
}

interface ChoiceOptionProps {
    isSelected: boolean;
    onSelect: () => void;
    display?: string;
}

function ChoiceOption(props: ChoiceOptionProps) {
    const { display, onSelect, isSelected } = props;

    return (
        <TouchableOpacity
            onPress={onSelect}
            style={styles.selectOptionContainer}
        >
            <View
                style={[
                    styles.selectBackground,
                    isSelected && styles.isSelectedBackground,
                ]}
            />
            <Text style={styles.selectText}>{display}</Text>
        </TouchableOpacity>
    );
}

function isOptionSelected(
    option: QuestionnaireItemAnswerOption,
    value?: Coding | QuestionnaireItemAnswerOption[],
    repeats?: boolean
) {
    const optionCode = option.value?.Coding?.code;

    return repeats
        ? (value as QuestionnaireItemAnswerOption[]).some(
              (answerOption) => answerOption.value?.Coding?.code === optionCode
          )
        : (value as Coding)?.code === optionCode;
}
