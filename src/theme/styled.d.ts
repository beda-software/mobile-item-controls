import 'styled-components/native';

declare module 'styled-components/native' {
    export interface DefaultTheme {
        colors: {
            primary: {
                color_1: string;
                color_2: string;
                color_3: string;
                color_4: string;
                color_5: string;
                color_6: string;
                color_7: string;
                color_8: string;
                color_9: string;
                color_10: string;
            };
        };
        spacing: {};
        typography: {};
        components: {
            Global: {
                colorBgContainer: string;
                colorBgContainerDisabled: string;
                colorBorder: string;
                colorBorderDisabled: string;
                colorErrorText: string;
                colorText: string;
                colorTextDescription: string;
                colorTextDisabled: string;
                borderRadius: number;
                borderWidth: number;
                fontSize: number;
            };
            Input?: {
                Global?: {
                    colorBgContainer?: string;
                    colorBgContainerDisabled?: string;
                    colorBorder?: string;
                    colorBorderDisabled?: string;
                    colorText?: string;
                    colorTextDescription?: string;
                    colorTextDisabled?: string;
                    borderRadius?: number;
                    borderWidth?: number;
                    fontSize?: number;
                };
                activeBg?: string;
                activeBorderColor?: string;
                addonBg?: string;
                paddingBlock: number;
                paddingInline: number;
            };
            InlineChoice?: {
                Global?: {
                    colorBgContainer?: string;
                    colorBgContainerDisabled?: string;
                    colorBorder?: string;
                    colorBorderDisabled?: string;
                    colorText?: string;
                    colorTextDescription?: string;
                    colorTextDisabled?: string;
                    borderRadius?: number;
                    borderWidth?: number;
                    fontSize?: number;
                };
                selectedBg?: string;
                selectedBorderColor?: string;
                paddingBlock: number;
                paddingInline: number;
                gap: number;
            };
        };
    }
}
