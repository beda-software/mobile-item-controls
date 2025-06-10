import React, { useCallback } from 'react';

import {
    getFieldErrorMessage,
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { Coding } from 'fhir/r4b';
import { FormAnswerItems, toAnswerValue } from 'sdc-qrf';

import { ChoiceOption } from './ChoiceOption';
import {
    extractAnswerOptionValueKey,
    getValuePath,
    isAnswerSelected,
} from './utils';
import { BaseControl } from '../BaseControl';

export function InlineChoiceControl(props: QuestionItemProps) {
    const { questionItem, parentPath } = props;
    const { repeats, answerOption, linkId, readOnly } = questionItem;

    const field = useFieldController<FormAnswerItems[] | Coding>(
        repeats
            ? [...parentPath, linkId]
            : getValuePath(questionItem, parentPath),
        questionItem
    );
    const { value, onChange, onMultiChange, fieldState } = field;
    const error = getFieldErrorMessage(field, fieldState, questionItem.text);

    const onSelect = useCallback(
        (option: FormAnswerItems) => {
            const key = extractAnswerOptionValueKey(option);
            repeats
                ? onMultiChange(option)
                : onChange(option.value?.[key] as Coding);
        },
        [onChange, onMultiChange, repeats]
    );

    return (
        <BaseControl {...props} error={error} customLayout={true}>
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
        </BaseControl>
    );
}
