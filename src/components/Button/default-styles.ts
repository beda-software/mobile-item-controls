import styled, { css } from 'styled-components/native';

import { buttonContainerStyles, buttonTextStyles } from './styles';
import { ButtonSize, ButtonType, IconPosition } from './types';

export const DefaultButtonStyles = {
    Container: styled.TouchableOpacity<{
        disabled: boolean;
        $size: ButtonSize;
        $danger: boolean;
    }>`
        ${buttonContainerStyles}

        border-width: 1px;
        border-color: #d9d9d9;

        ${({ disabled, $danger }) => {
            if (disabled) {
                return css`
                    background-color: rgba(0, 0, 0, 0.04);
                    border-width: 1px;
                    border-color: #d9d9d9;
                `;
            }

            if ($danger) {
                return css`
                    border-color: #ff4d4f;
                `;
            }

            return css``;
        }};
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
            if (props.$disabled) {
                return 'rgba(0, 0, 0, 0.25)';
            }

            if (props.$danger) {
                return '#FF4D4F';
            }

            return 'rgba(0, 0, 0, 0.85)';
        }};
    `,
    Icon: styled.View<{
        $position: IconPosition;
    }>`
        tint-color: #fff;
    `,
};
