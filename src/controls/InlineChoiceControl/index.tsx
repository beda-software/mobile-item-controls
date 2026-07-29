import React from 'react';

import {
    getFieldErrorMessage,
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { FormAnswerItems, toAnswerValue } from 'sdc-qrf';

import { ChoiceOption } from './ChoiceOption';
import { isAnswerSelected } from './utils';
import { BaseControl } from '../BaseControl';

export function InlineChoiceControl(props: QuestionItemProps) {
    const { questionItem, parentPath } = props;
    const { repeats, answerOption, linkId, readOnly } = questionItem;

    const field = useFieldController<FormAnswerItems[]>(
        [...parentPath, linkId],
        questionItem
    );
    const { value, onMultiChange, fieldState } = field;
    const error = getFieldErrorMessage(field, fieldState, questionItem.text);

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
                            value
                        )}
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
