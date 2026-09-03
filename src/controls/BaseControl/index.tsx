import React, { PropsWithChildren } from 'react';

import { QuestionItemProps } from '@beda.software/fhir-questionnaire';

import { useRowLayout } from '../RowGroup';
import { S } from '../styles';

export interface BaseControlProps extends PropsWithChildren<QuestionItemProps> {
    onFocus?: () => void;
    isActive?: boolean;
    error?: string;
    customLayout?: boolean;
}

export function BaseControl({
    questionItem,
    onFocus,
    isActive,
    children,
    error,
    customLayout = false,
}: BaseControlProps) {
    const { readOnly, required = false } = questionItem;
    const hasText = questionItem.text !== undefined;
    const hasHelpText = questionItem.helpText !== undefined;
    const hasLabel = hasText || hasHelpText;
    const inRow = useRowLayout();

    return (
        <S.Container $inRow={inRow}>
            {hasLabel ? (
                <S.ContainerQuestionTextWrapper>
                    {hasText ? (
                        <S.ContainerQuestionText>
                            {required ? (
                                <S.ContainerQuestionAsterisk>
                                    *{' '}
                                </S.ContainerQuestionAsterisk>
                            ) : null}
                            {questionItem.text}
                        </S.ContainerQuestionText>
                    ) : null}
                    {hasHelpText ? (
                        <S.ContainerQuestionHelpText>
                            {questionItem.helpText}
                        </S.ContainerQuestionHelpText>
                    ) : null}
                </S.ContainerQuestionTextWrapper>
            ) : null}
            {customLayout ? (
                children
            ) : (
                <S.InputWrapper
                    activeOpacity={1}
                    onPress={onFocus}
                    $readOnly={readOnly}
                    $active={isActive}
                    accessibilityRole="button"
                    accessibilityLabel={questionItem.text}
                    accessibilityState={{ disabled: readOnly }}
                    testID={`control-${questionItem.linkId}`}
                >
                    {children}
                </S.InputWrapper>
            )}
            {error && <S.ContainerErrorText>{error}</S.ContainerErrorText>}
        </S.Container>
    );
}
