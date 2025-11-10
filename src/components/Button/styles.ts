import styled, { css } from 'styled-components/native';

import { ButtonSize, ButtonVariant } from './types';

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
    Container: styled.TouchableHighlight<{
        $variant: ButtonVariant;
        $ghost: boolean;
        $danger: boolean;
        $size: ButtonSize;
        disabled: boolean;
    }>`
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border-radius: 4px;
        padding: ${(props) => SIZES[props.$size].padding};
        opacity: ${(props) => (props.disabled ? 0.5 : 1)};
    `,
    Text: styled.Text<{
        $variant: ButtonVariant;
        $ghost: boolean;
        $danger: boolean;
        $disabled: boolean;
        $size: ButtonSize;
    }>`
        font-size: ${(props) => SIZES[props.$size].fontSize};
        font-weight: 500;
    `,
};
