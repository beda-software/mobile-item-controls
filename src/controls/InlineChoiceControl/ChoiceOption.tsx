import React from 'react';

import { Text } from 'react-native';
import { AnswerValue } from 'sdc-qrf';

import { S, styles } from '../styles';
import { extractKeyFromValue, getAnswerDisplay } from './utils';

interface ChoiceOptionProps {
    isSelected: boolean;
    readOnly: boolean;
    multiselect: boolean;
    onSelect: () => void;
    value?: AnswerValue;
}

export const ChoiceOption = ({
    isSelected,
    readOnly,
    multiselect,
    onSelect,
    value,
}: ChoiceOptionProps) => {
    const key = value ? extractKeyFromValue(value) : undefined;

    return (
        <S.InlineChoiceWrapper
            onPress={onSelect}
            $readOnly={readOnly}
            $active={isSelected}
        >
            <S.InlineChoiceCheckMark
                $readOnly={readOnly}
                $active={isSelected}
                $radio={!multiselect}
            >
                <S.InlineChoiceCheckMarkChecked
                    $readOnly={readOnly}
                    $active={isSelected}
                    $radio={!multiselect}
                />
            </S.InlineChoiceCheckMark>
            <Text style={styles.selectText}>
                {key ? getAnswerDisplay(key, value) : ''}
            </Text>
        </S.InlineChoiceWrapper>
    );
};
