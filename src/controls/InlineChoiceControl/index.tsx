import React, { useCallback } from 'react';

import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { Coding } from 'fhir/r4b';
import { View } from 'react-native';
import { FormAnswerItems, toAnswerValue } from 'sdc-qrf';

import { renderText } from '../../components/TextRender';
import { styles } from '../styles';
import { ChoiceOption } from './ChoiceOption';
import {
    extractAnswerOptionValueKey,
    getValuePath,
    isAnswerSelected,
} from './utils';

export function InlineChoiceControl({
    questionItem,
    parentPath,
}: QuestionItemProps) {
    const { repeats, answerOption, text, linkId, readOnly } = questionItem;

    const { value, onChange, onMultiChange } = useFieldController<
        FormAnswerItems[] | Coding
    >(
        repeats
            ? [...parentPath, linkId]
            : getValuePath(questionItem, parentPath),
        questionItem
    );

    const onSelect = useCallback(
        (option: FormAnswerItems) => {
            const key = extractAnswerOptionValueKey(option);
            repeats
                ? onMultiChange(option)
                : onChange(option.value?.[key] as Coding);
        },
        [onChange, onMultiChange, repeats]
    );

    //TODO handle questionItem.answerValueSet

    if (questionItem.hidden) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View>{renderText(text, styles.text)}</View>
            {answerOption?.map((option, index: React.Key) => {
                const answer = toAnswerValue(option, 'value')!;

                return (
                    <ChoiceOption
                        key={index}
                        readOnly={!!readOnly}
                        multiselect={!!repeats}
                        isSelected={isAnswerSelected(
                            {
                                value: answer,
                            },
                            value,
                            repeats
                        )}
                        onSelect={() =>
                            onSelect({
                                value: answer,
                            })
                        }
                        value={answer}
                    />
                );
            })}
        </View>
    );
}
