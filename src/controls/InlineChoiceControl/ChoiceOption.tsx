import React from 'react';

import { AnswerValue } from 'sdc-qrf';

import { InlineChoiceMark } from '../InlineChoiceMark';
import { S } from '../styles';
import { extractKeyFromValue, getAnswerDisplay } from './utils';

interface ChoiceOptionProps {
    isSelected: boolean;
    readOnly: boolean;
    multiselect: boolean;
    onSelect: (value?: AnswerValue) => void;
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
    const display = key ? getAnswerDisplay(key, value) : '';

    return (
        <S.InlineChoiceWrapper
            onPress={() => onSelect(value)}
            disabled={readOnly}
            $readOnly={readOnly}
            $active={isSelected}
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityLabel={display}
            accessibilityState={{ selected: isSelected, disabled: readOnly }}
            testID={`choice-option-${display}`}
        >
            <InlineChoiceMark
                active={isSelected}
                readOnly={readOnly}
                radio={!multiselect}
            />
            <S.InlineChoiceOptionText $readOnly={readOnly}>
                {display}
            </S.InlineChoiceOptionText>
        </S.InlineChoiceWrapper>
    );
};
