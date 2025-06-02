import { DefaultTheme } from 'styled-components/native';

export const lightTheme: DefaultTheme = {
    colors: {
        primary: {
            color_1: '#F0F6FF',
            color_2: '#D6E6FF',
            color_3: '#ADCAFF',
            color_4: '#85ABFF',
            color_5: '#5C8AFF',
            color_6: '#3366FF',
            color_7: '#2148D9',
            color_8: '#122FB3',
            color_9: '#071B8C',
            color_10: '#041066',
        },
    },
    spacing: {},
    typography: {},
    components: {
        Global: {
            colorBgContainer: 'white',
            colorBgContainerDisabled: '#FFFFFF80',
            colorBorder: '#00000026',
            colorBorderDisabled: '#00000026',
            colorText: 'black',
            colorTextDescription: 'black',
            colorTextDisabled: '#00000080',
            colorErrorText: '#FF4D4F',
            borderRadius: 16,
            borderWidth: 1,
            fontSize: 16,
            lineHeight: 16,
        },
        Input: {
            activeBg: 'white',
            activeBorderColor: '#3366FF',
            addonBg: '#FAFAFA',
            paddingBlock: 12,
            paddingInline: 12,
        },
    },
};

export const darkTheme: DefaultTheme = {
    ...lightTheme,
    colors: {
        primary: {
            color_1: '#14182C',
            color_2: '#172145',
            color_3: '#1D2D5B',
            color_4: '#22397E',
            color_5: '#2849AD',
            color_6: '#2E5ADC',
            color_7: '#557EE8',
            color_8: '#7FA3F3',
            color_9: '#A8C5F8',
            color_10: '#D2E2FA',
        },
    },
    components: {
        Global: {
            colorBgContainer: 'white',
            colorBgContainerDisabled: '#FFFFFF80',
            colorBorder: '#00000026',
            colorBorderDisabled: '#00000026',
            colorText: 'black',
            colorTextDescription: 'black',
            colorTextDisabled: '#00000080',
            colorErrorText: '#FF4D4F',
            borderRadius: 16,
            borderWidth: 1,
            fontSize: 16,
            lineHeight: 16,
        },
        Input: {
            activeBg: 'white',
            activeBorderColor: '#3366FF',
            addonBg: '#FAFAFA',
            paddingBlock: 12,
            paddingInline: 12,
        },
    },
};
