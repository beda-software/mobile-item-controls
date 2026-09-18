import React from 'react';

import { useTheme } from 'styled-components/native';

import { CheckIcon } from './CheckIcon';
import { S } from '../styles';

interface InlineChoiceMarkProps {
    active: boolean;
    readOnly: boolean;
    radio: boolean;
}

export function InlineChoiceMark({
    active,
    readOnly,
    radio,
}: InlineChoiceMarkProps) {
    const theme = useTheme();
    const showTick = !radio && active;

    return (
        <S.InlineChoiceCheckMark
            $readOnly={readOnly}
            $active={active}
            $radio={radio}
            accessibilityElementsHidden
            importantForAccessibility="no-hide-descendants"
        >
            {showTick ? (
                <CheckIcon color={theme.components.Global.colorBgContainer} />
            ) : (
                <S.InlineChoiceCheckMarkChecked
                    $readOnly={readOnly}
                    $active={active}
                    $radio={radio}
                />
            )}
        </S.InlineChoiceCheckMark>
    );
}
