import React from 'react';

import {
    getFieldErrorMessage,
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { FormAnswerItems, toAnswerValue } from 'sdc-qrf';

import { ChoiceOption } from './ChoiceOption';
import { isAnswerSelected } from './utils';
import { useIsFieldHighlighted } from '../../contexts/highlighted-fields';
import { BaseControl } from '../BaseControl';

export function InlineChoiceControl(props: QuestionItemProps) {
    const { questionItem, parentPath } = props;
    const { repeats, answerOption, linkId } = questionItem;

    const field = useFieldController<FormAnswerItems[]>(
        [...parentPath, linkId],
        questionItem
    );
    // `disabled` folds the item's readOnly with the form-level one; the item flag alone misses a read-only form.
    const { value, onMultiChange, fieldState, disabled } = field;
    const error = getFieldErrorMessage(field, fieldState, questionItem.text);
    const highlighted = useIsFieldHighlighted([...parentPath, linkId]);

    return (
        <BaseControl {...props} error={error} customLayout={true}>
            {answerOption?.map((option, index: React.Key) => {
                const answer = toAnswerValue(option, 'value')!;
                const isSelected = isAnswerSelected(
                    {
                        value: answer,
                    },
                    value
                );

                return (
                    <ChoiceOption
                        key={index}
                        readOnly={!!disabled}
                        multiselect={!!repeats}
                        isSelected={isSelected}
                        highlighted={highlighted && isSelected}
                        onSelect={() =>
                            onMultiChange({
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
