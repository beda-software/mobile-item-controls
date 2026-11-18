import React from 'react';

import { InlineChoiceMark } from '../../controls/InlineChoiceMark';
import { S } from '../../controls/styles';

export interface CheckboxRowProps {
    checked: boolean;
    label: string;
    onPress: () => void;
    disabled?: boolean;
    highlighted?: boolean;
    testID?: string;
}

/** The bordered checkbox row of a boolean answer, usable outside a form field. */
export function CheckboxRow(props: CheckboxRowProps) {
    const { checked, label, onPress, disabled, highlighted, testID } = props;

    return (
        <S.InlineChoiceWrapper
            onPress={onPress}
            disabled={disabled}
            $readOnly={disabled}
            $active={checked}
            $highlighted={highlighted}
            activeOpacity={1}
            accessibilityRole="button"
            accessibilityLabel={label}
            accessibilityState={{ checked, disabled }}
            testID={testID}
        >
            <InlineChoiceMark active={checked} readOnly={!!disabled} radio={false} />
            <S.InlineChoiceOptionText $readOnly={disabled}>{label}</S.InlineChoiceOptionText>
        </S.InlineChoiceWrapper>
    );
}
