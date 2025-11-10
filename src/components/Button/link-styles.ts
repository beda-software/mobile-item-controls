import styled from 'styled-components/native';

import { buttonContainerStyles, buttonTextStyles } from './styles';
import { ButtonSize, ButtonVariant } from './types';

export const LinkButtonStyles = {
    Container: styled.TouchableOpacity<{
        disabled: boolean;
        $size: ButtonSize;
        $danger: boolean;
    }>`
        ${buttonContainerStyles}
    `,
    Text: styled.Text<{
        $variant: ButtonVariant;
        $ghost: boolean;
        $danger: boolean;
        $disabled: boolean;
        $size: ButtonSize;
    }>`
        ${buttonTextStyles}

        color: ${({ theme, $danger, $disabled }) => {
            if ($danger) {
                return '#FF4D4F';
            }

            if ($disabled) {
                return 'rgba(0, 0, 0, 0.25)';
            }

            return theme.colors.primary.color_6;
        }};
    `,
};
