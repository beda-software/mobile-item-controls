import React from 'react';

import { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';

export type ButtonVariant = 'solid' | 'filled' | 'outlined' | 'text' | 'link';
export type ButtonType = 'default' | 'primary' | 'text' | 'link';
export type ButtonSize = 'large' | 'middle' | 'small';
export type IconPosition = 'start' | 'end';

export interface ButtonProps extends TouchableOpacityProps {
    style?: StyleProp<ViewStyle>;
    componentStyles?: any;
    variant?: ButtonVariant;
    /**
     * @deprecated Use 'variant' instead
     */
    type?: ButtonType;
    loading?: boolean;
    ghost?: boolean;
    danger?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    iconPosition?: IconPosition;
    size?: ButtonSize;
    active?: boolean;
}
