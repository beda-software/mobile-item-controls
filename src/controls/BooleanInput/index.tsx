import React from 'react';

import {
    getFieldErrorMessage,
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';

import { useRowLayout } from '../RowGroup';
import { S } from '../styles';

export function BooleanInput(props: QuestionItemProps) {
    const { questionItem, parentPath } = props;
    const { linkId, readOnly } = questionItem;
    const fieldName = [...parentPath, linkId, 0, 'value', 'boolean'];
    const field = useFieldController<boolean>(fieldName, questionItem);
    const { value, onChange, fieldState } = field;
    const error = getFieldErrorMessage(field, fieldState, questionItem.text);

    const isChecked = Boolean(value);
    const inRow = useRowLayout();

    return (
        <S.Container $inRow={inRow}>
            <S.InlineChoiceWrapper
                onPress={() => onChange(!value)}
                $readOnly={readOnly}
                $active={isChecked}
                activeOpacity={1}
            >
                <S.InlineChoiceCheckMark
                    $readOnly={readOnly}
                    $active={isChecked}
                    $radio={false}
                >
                    <S.InlineChoiceCheckMarkChecked
                        $readOnly={readOnly}
                        $active={isChecked}
                        $radio={false}
                    />
                </S.InlineChoiceCheckMark>
                <S.InlineChoiceOptionText>
                    {questionItem.text}
                </S.InlineChoiceOptionText>
            </S.InlineChoiceWrapper>
            {questionItem.helpText !== undefined ? (
                <S.ContainerQuestionHelpText>
                    {questionItem.helpText}
                </S.ContainerQuestionHelpText>
            ) : null}
            {error && <S.ContainerErrorText>{error}</S.ContainerErrorText>}
        </S.Container>
    );
}
