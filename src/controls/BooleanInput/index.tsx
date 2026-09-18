import React from 'react';

import {
    getFieldErrorMessage,
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';

import { InlineChoiceMark } from '../InlineChoiceMark';
import { useRowLayout } from '../RowGroup';
import { S } from '../styles';

export function BooleanInput(props: QuestionItemProps) {
    const { questionItem, parentPath } = props;
    const { linkId } = questionItem;
    const fieldName = [...parentPath, linkId, 0, 'value', 'boolean'];
    const field = useFieldController<boolean>(fieldName, questionItem);
    // `disabled` folds the item's readOnly with the form-level one; the item flag alone misses a read-only form.
    const { value, onChange, fieldState, disabled } = field;
    const error = getFieldErrorMessage(field, fieldState, questionItem.text);

    const isChecked = Boolean(value);
    const inRow = useRowLayout();

    return (
        <S.Container $inRow={inRow}>
            <S.InlineChoiceGroup>
                <S.InlineChoiceWrapper
                    onPress={() => onChange(!value)}
                    disabled={disabled}
                    $readOnly={disabled}
                    $active={isChecked}
                    activeOpacity={1}
                    accessibilityRole="button"
                    accessibilityLabel={questionItem.text}
                    accessibilityState={{ checked: isChecked, disabled }}
                    testID={`boolean-input-${linkId}`}
                >
                    <InlineChoiceMark
                        active={isChecked}
                        readOnly={!!disabled}
                        radio={false}
                    />
                    <S.InlineChoiceOptionText $readOnly={disabled}>
                        {questionItem.text}
                    </S.InlineChoiceOptionText>
                </S.InlineChoiceWrapper>
                {questionItem.helpText !== undefined ? (
                    <S.InlineChoiceHelpTextWrapper>
                        <S.ContainerQuestionHelpText>
                            {questionItem.helpText}
                        </S.ContainerQuestionHelpText>
                    </S.InlineChoiceHelpTextWrapper>
                ) : null}
            </S.InlineChoiceGroup>
            {error && <S.ContainerErrorText>{error}</S.ContainerErrorText>}
        </S.Container>
    );
}
