import styled from 'styled-components/native';

const FONT_FAMILIES: Record<number, string> = {
    300: 'MaterialSymbolsRounded_300Light',
    400: 'MaterialSymbolsRounded_400Regular',
    500: 'MaterialSymbolsRounded_500Medium',
    600: 'MaterialSymbolsRounded_600SemiBold',
    700: 'MaterialSymbolsRounded_700Bold',
};

export const S = {
    Icon: styled.Text<{ $fontSize: number; $fontWeight: number; $color?: string }>`
        color: ${({ $color }) => $color ?? 'rgba(0, 0, 0, 0.88)'};
        font-size: ${({ $fontSize }) => $fontSize}px;
        font-family: ${({ $fontWeight }) => FONT_FAMILIES[$fontWeight] ?? FONT_FAMILIES[400]};
    `,
};
