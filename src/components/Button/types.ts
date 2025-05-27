import { ReactNode } from "react";

import { ImageSourcePropType, StyleProp, ViewStyle } from "react-native";

export type ButtonType = 'default' | 'primary' | 'text' | 'link';
export type ButtonSize = 'large' | 'middle' | 'small';
export type IconPosition = 'start' | 'end';

export interface ButtonProps {
    style?: StyleProp<ViewStyle>;
    type?: ButtonType;
    loading?: boolean;
    ghost?: boolean;
    danger?: boolean;
    disabled?: boolean;
    icon?: ImageSourcePropType;
    iconPosition?: IconPosition;
    size?: ButtonSize;
    onPress?: () => void;
    children?: ReactNode;
}