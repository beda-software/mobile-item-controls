import styled, { css } from 'styled-components/native';

import { ButtonSize, ButtonType, IconPosition } from './types';

// Design tokens
export const COLORS = {
    primary: '#1890ff',
    danger: '#ff4d4f',
    white: '#fff',
    border: '#d9d9d9',
    textPrimary: '#000000d9',
    textDisabled: '#00000040',
};

const SIZES = {
    large: {
        padding: '16px',
        borderRadius: '8px',
        fontSize: '16px',
        lineHeight: '22px',
    },
    middle: {
        padding: '12px',
        borderRadius: '8px',
        fontSize: '16px',
        lineHeight: '22px',
    },
    small: {
        padding: '8px',
        borderRadius: '8px',
        fontSize: '16px',
        lineHeight: '22px',
    },
};

export const buttonContainerStyles = css<{
    $size: ButtonSize;
}>`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 8px;
    border-radius: ${(props) => SIZES[props.$size].borderRadius};
    padding: ${(props) => SIZES[props.$size].padding};
`;

export const buttonTextStyles = css<{
    $size: ButtonSize;
}>`
    font-weight: 500;
    font-size: ${(props) => SIZES[props.$size].fontSize};
    line-height: ${(props) => SIZES[props.$size].lineHeight};
`;

export const buttonIconStyles = css<{
    $size: ButtonSize;
}>`
`;

export const S = {
    Container: styled.TouchableOpacity<{
        $type: ButtonType;
        $ghost: boolean;
        $danger: boolean;
        $size: ButtonSize;
        disabled: boolean;
    }>`
        flex-direction: row;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        padding: ${(props) => SIZES[props.$size].padding};

        /* Background color */
        background-color: ${(props) => {
            if (props.$ghost) return 'transparent';

            switch (props.$type) {
                case 'primary':
                    return props.$danger ? COLORS.danger : COLORS.primary;
                case 'text':
                case 'link':
                    return 'transparent';
                default:
                    return COLORS.white;
            }
        }};

        /* Border style */
        border: ${(props) => {
            switch (props.$type) {
                case 'primary':
                    return `1px solid ${props.$danger ? COLORS.danger : COLORS.primary}`;
                case 'text':
                case 'link':
                    return '0';
                default:
                    return `1px solid ${COLORS.border}`;
            }
        }};

        opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    `,
    Text: styled.Text<{
        $type: ButtonType;
        $ghost: boolean;
        $danger: boolean;
        $disabled: boolean;
        $size: ButtonSize;
    }>`
        font-size: ${(props) => SIZES[props.$size].fontSize};

        /* Text color */
        color: ${(props) => {
            if (props.disabled) {
                return props.$type === 'default' ? COLORS.textDisabled : COLORS.white;
            }

            if (props.$danger) {
                return props.$type === 'primary' && !props.$ghost ? COLORS.white : COLORS.danger;
            }

            switch (props.$type) {
                case 'primary':
                    return props.$ghost ? COLORS.primary : COLORS.white;
                case 'link':
                    return COLORS.primary;
                default:
                    return COLORS.textPrimary;
            }
        }};

        font-weight: ${(props) => (props.$type === 'primary' ? 'bold' : 'normal')};
        text-decoration: ${(props) => (props.$type === 'link' ? 'underline' : 'none')};
    `,
    Icon: styled.View<{
        $position: IconPosition;
    }>`
        margin-left: ${(props) => (props.$position === 'end' ? '8px' : '0')};
        margin-right: ${(props) => (props.$position === 'start' ? '8px' : '0')};
    `,
};
