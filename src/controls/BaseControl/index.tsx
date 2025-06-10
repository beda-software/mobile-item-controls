import React, { PropsWithChildren } from 'react';

import { QuestionItemProps } from '@beda.software/fhir-questionnaire';

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
    const { readOnly } = questionItem;

    return (
        <S.Container>
            <S.ContainerQuestionTextWrapper>
                <S.ContainerQuestionText>
                    {questionItem.text}
                </S.ContainerQuestionText>
                {questionItem.helpText !== undefined ? (
                    <S.ContainerQuestionHelpText>
                        {questionItem.helpText}
                    </S.ContainerQuestionHelpText>
                ) : null}
            </S.ContainerQuestionTextWrapper>
            {customLayout ? (
                children
            ) : (
                <S.InputWrapper
                    activeOpacity={1}
                    onPress={onFocus}
                    $readOnly={readOnly}
                    $active={isActive}
                >
                    {children}
                </S.InputWrapper>
            )}
            {error && <S.ContainerErrorText>{error}</S.ContainerErrorText>}
        </S.Container>
    );
}
