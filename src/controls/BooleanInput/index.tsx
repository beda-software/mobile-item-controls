import React from 'react';

import {
    getFieldErrorMessage,
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';

import { CheckboxRow } from '../../components/CheckboxRow';
import { useFieldAccessory } from '../../contexts/field-accessory';
import { useIsFieldHighlighted } from '../../contexts/highlighted-fields';
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
    // Highlighted whether checked or not: an unchecked box is an answer too.
    const highlighted = useIsFieldHighlighted([...parentPath, linkId]);
    const accessory = useFieldAccessory([...parentPath, linkId]);

    return (
        <S.Container $inRow={inRow}>
            <S.AnswerRow>
                <S.AnswerColumn>
                    <S.InlineChoiceGroup>
                        <CheckboxRow
                            checked={isChecked}
                            label={questionItem.text ?? ''}
                            onPress={() => onChange(!value)}
                            disabled={disabled}
                            highlighted={highlighted}
                            testID={`boolean-input-${linkId}`}
                        />
                        {questionItem.helpText !== undefined ? (
                            <S.InlineChoiceHelpTextWrapper>
                                <S.ContainerQuestionHelpText>
                                    {questionItem.helpText}
                                </S.ContainerQuestionHelpText>
                            </S.InlineChoiceHelpTextWrapper>
                        ) : null}
                    </S.InlineChoiceGroup>
                </S.AnswerColumn>
                {accessory}
            </S.AnswerRow>
            {error && <S.ContainerErrorText>{error}</S.ContainerErrorText>}
        </S.Container>
    );
}
