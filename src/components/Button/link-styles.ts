import styled, { css } from 'styled-components/native';

import { buttonContainerStyles, buttonTextStyles } from './styles';
import { ButtonSize, ButtonType } from './types';

export const LinkButtonStyles = {
    Container: styled.TouchableOpacity<{
        disabled: boolean;
        $size: ButtonSize;
        $danger: boolean;
    }>`
        ${buttonContainerStyles}

        ${({ disabled }) =>
            disabled &&
            css`
                opacity: ${disabled ? 0.65 : 1};
            `}
    `,
    Text: styled.Text<{
        $type: ButtonType;
        $ghost: boolean;
        $danger: boolean;
        $disabled: boolean;
        $size: ButtonSize;
    }>`
        ${buttonTextStyles}

        color: ${(props) => {
            if (props.$danger) {
                return '#FF4D4F';
            }

            return props.theme.colors.primary.color_6;
        }};
    `,
};
