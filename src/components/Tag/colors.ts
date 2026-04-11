import { ColorConfig, TagColor, TagType } from './types';

interface ColorTokens {
    color_1: string;
    color_3: string;
    color_6: string;
}

const LIGHT_TAG_COLORS: Record<TagColor, ColorTokens> = {
    gray: { color_1: '#f8f9fa', color_3: '#dee2e6', color_6: '#f8f9fa' },
    red: { color_1: '#ffebe9', color_3: '#ffaba8', color_6: '#fa4549' },
    volcano: { color_1: '#fff2e8', color_3: '#ffbb96', color_6: '#fa541c' },
    orange: { color_1: '#fff7e6', color_3: '#ffd591', color_6: '#fa8c16' },
    gold: { color_1: '#fffbe6', color_3: '#ffe58f', color_6: '#faad14' },
    yellow: { color_1: '#feffe6', color_3: '#fffb8f', color_6: '#fadb14' },
    lime: { color_1: '#fcffe6', color_3: '#eaff8f', color_6: '#a0d911' },
    green: { color_1: '#ecfdf5', color_3: '#a7f3d0', color_6: '#10b981' },
    cyan: { color_1: '#e6fffb', color_3: '#87e8de', color_6: '#13c2c2' },
    geekblue: { color_1: '#f0f5ff', color_3: '#adc6ff', color_6: '#2f54eb' },
    blue: { color_1: '#e6f4ff', color_3: '#91caff', color_6: '#1677ff' },
    purple: { color_1: '#f9f0ff', color_3: '#d3adf7', color_6: '#722ed1' },
    magenta: { color_1: '#fff0f6', color_3: '#ffadd2', color_6: '#eb2f96' },
};

const DARK_TAG_COLORS: Record<TagColor, ColorTokens> = {
    gray: { color_1: '#16191c', color_3: '#495057', color_6: '#16191c' },
    red: { color_1: '#2a1215', color_3: '#58181c', color_6: '#a61d24' },
    volcano: { color_1: '#2b1611', color_3: '#592716', color_6: '#d84a1b' },
    orange: { color_1: '#2b1d11', color_3: '#593815', color_6: '#d87a16' },
    gold: { color_1: '#2b2111', color_3: '#594214', color_6: '#d89614' },
    yellow: { color_1: '#2b2611', color_3: '#595014', color_6: '#d8bd14' },
    lime: { color_1: '#1f2611', color_3: '#3e4f13', color_6: '#8bbb11' },
    green: { color_1: '#162312', color_3: '#274916', color_6: '#49aa19' },
    cyan: { color_1: '#112123', color_3: '#144848', color_6: '#13a8a8' },
    geekblue: { color_1: '#131629', color_3: '#1c2755', color_6: '#2b4acb' },
    blue: { color_1: '#111a2c', color_3: '#15325b', color_6: '#1668dc' },
    purple: { color_1: '#1a1325', color_3: '#301c4d', color_6: '#642ab5' },
    magenta: { color_1: '#291321', color_3: '#551c3b', color_6: '#cb2b83' },
};

const DARK_TEXT_LIGHT = 'rgba(0,0,0,0.88)';
const DARK_TEXT_DARK = 'rgba(255,255,255,0.88)';

const USES_DARK_TEXT: TagColor[] = ['gray', 'lime', 'yellow'];

export function getTagColors(color: TagColor, type: TagType, isDark: boolean): ColorConfig {
    const palette = isDark ? DARK_TAG_COLORS[color] : LIGHT_TAG_COLORS[color];
    const darkText = isDark ? DARK_TEXT_DARK : DARK_TEXT_LIGHT;

    switch (type) {
        case 'solid': {
            const usesDarkText = USES_DARK_TEXT.includes(color);
            return {
                bg: color === 'gray' ? palette.color_1 : palette.color_6,
                text: usesDarkText ? darkText : 'white',
            };
        }
        case 'border':
            return {
                bg: palette.color_1,
                border: palette.color_3,
                text: color === 'gray' ? darkText : palette.color_6,
            };
        case 'borderless':
            return {
                bg: palette.color_1,
                text: color === 'gray' ? darkText : palette.color_6,
            };
    }
}
