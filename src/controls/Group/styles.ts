import styled from 'styled-components/native';

const GROUP_GAP = 16;

export const S = {
    Container: styled.View`
        position: relative;
        gap: ${GROUP_GAP}px;
    `,
    Instance: styled.View`
        gap: ${GROUP_GAP}px;
    `,
};
