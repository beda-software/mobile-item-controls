import styled, { css } from 'styled-components/native';

export const S = {
    Container: styled.View<{ $bgColor: string; $borderColor?: string }>`
        flex-direction: row;
        align-items: center;
        gap: 4px;
        padding-horizontal: 8px;
        padding-vertical: 1px;
        border-radius: 8px;
        background-color: ${({ $bgColor }) => $bgColor};
        ${({ $borderColor }) =>
            $borderColor
                ? css`
                      border-width: 1px;
                      border-style: solid;
                      border-color: ${$borderColor};
                  `
                : ''}
        align-self: flex-start;
    `,
    Label: styled.Text<{ $color: string }>`
        font-size: 12px;
        font-weight: 600;
        line-height: 20px;
        color: ${({ $color }) => $color};
    `,
    CloseButton: styled.TouchableOpacity`
        width: 10px;
        height: 10px;
        align-items: center;
        justify-content: center;
    `,
};
