import styled from 'styled-components/native';

const GROUP_GAP = 16;

export const S = {
    Container: styled.View<{ $inRow?: boolean }>`
        position: relative;
        gap: ${GROUP_GAP}px;
        ${({ $inRow }) => ($inRow ? 'flex: 1;' : '')}
    `,
    Instance: styled.View`
        gap: ${GROUP_GAP}px;
    `,
};
