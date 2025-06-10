import React, { PropsWithChildren } from 'react';

import { QuestionItemProps } from '@beda.software/fhir-questionnaire';
import { Text, View } from 'react-native';

import { renderText } from '../../components/TextRender';
import { S, styles } from '../styles';

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
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {renderText(questionItem.text, styles.text)}
                {renderText(questionItem.helpText)}
            </View>
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
            {error && <Text style={{ color: 'red' }}>{error}</Text>}
        </View>
    );
}
