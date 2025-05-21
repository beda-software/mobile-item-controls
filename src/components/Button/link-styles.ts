import styled from 'styled-components/native';

import { buttonContainerStyles, buttonTextStyles } from './styles';
import { ButtonSize, ButtonType, IconPosition } from './types';

export const LinkButtonStyles = {
    Container: styled.TouchableOpacity<{
        disabled: boolean;
        $size: ButtonSize;
        $danger: boolean;
    }>`
        ${buttonContainerStyles}
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

            return props.theme.colors.primary.color_6;
        }};
    `,
    Icon: styled.View<{
        $position: IconPosition;
    }>`
        tint-color: #fff;
    `,
};
