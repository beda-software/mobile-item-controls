import React, { PropsWithChildren } from 'react';

import { QuestionItemProps } from '@beda.software/fhir-questionnaire';
import { GroupItemProps } from '@beda.software/fhir-questionnaire/components/QuestionnaireResponseForm/BaseQuestionnaireResponseForm/GroupComponent';

import { S } from '../styles';

export interface BaseControlProps extends PropsWithChildren<QuestionItemProps> {
    customLayout?: boolean;
}

export const emptyText = 'Not provided';

export function BaseControlLabel({
    questionItem,
}: QuestionItemProps | GroupItemProps) {
    const hasText = questionItem.text !== undefined;
    const hasHelpText = questionItem.helpText !== undefined;

    if (!hasText && !hasHelpText) {
        return null;
    }

    return (
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
    );
}

export function BaseControl(props: BaseControlProps) {
    const { children, customLayout = false } = props;

    return (
        <S.Container>
            <BaseControlLabel {...props} />
            {customLayout ? (
                children
            ) : (
                <S.ContentWrapper>{children}</S.ContentWrapper>
            )}
        </S.Container>
    );
}
