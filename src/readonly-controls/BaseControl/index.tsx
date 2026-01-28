import React, { PropsWithChildren } from 'react';

import { QuestionItemProps } from '@beda.software/fhir-questionnaire';

import { S } from '../styles';

export interface BaseControlProps extends PropsWithChildren<QuestionItemProps> {
    customLayout?: boolean;
}

export const emptyText = "Not provided";

export function BaseControl({
    questionItem,
    children,
    customLayout = false,
}: BaseControlProps) {
    const hasText = questionItem.text !== undefined;
    const hasHelpText = questionItem.helpText !== undefined;
    const hasLabel = hasText || hasHelpText;

    return (
        <S.Container>
            {hasLabel ? (
                <S.ContainerQuestionTextWrapper>
                    {hasText ? (
                        <S.ContainerQuestionText>
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
                <S.ContentWrapper>{children}</S.ContentWrapper>
            )}
        </S.Container>
    );
}
