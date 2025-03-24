import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { QuestionnaireItemAnswerOption } from '@beda.software/fhir-questionnaire/contrib/aidbox';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { renderText } from '../../components/TextRender';
import { styles } from '../styles';
import { ChoiceOption } from './ChoiceOption';
import {
    extractAnswerOptionValueKey,
    getValuePath,
    isAnswerSelected,
} from './utils';

export function ChoiceInput({ questionItem, parentPath }: QuestionItemProps) {
    const { repeats, answerOption, text, linkId } = questionItem;

    const { value, onChange, onMultiChange } = useFieldController(
        repeats
            ? [...parentPath, linkId]
            : getValuePath(questionItem, parentPath),
        questionItem
    );

    const onSelect = useCallback(
        (option: QuestionnaireItemAnswerOption) => {
            const key = extractAnswerOptionValueKey(option);
            repeats ? onMultiChange(option) : onChange(option.value?.[key]);
        },
        [onChange, onMultiChange, repeats]
    );

    return (
        <View style={styles.container}>
            <View>{renderText(text, styles.text)}</View>
            {answerOption.map(
                (option: QuestionnaireItemAnswerOption, index: React.Key) => (
                    <ChoiceOption
                        key={index}
                        isSelected={isAnswerSelected(option, value, repeats)}
                        onSelect={() => onSelect(option)}
                        value={option.value}
                    />
                )
            )}
        </View>
    );
}
