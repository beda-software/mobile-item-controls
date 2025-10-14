import React from 'react';

import { StyleProp, TouchableOpacityProps, ViewStyle } from 'react-native';

export type ButtonType = 'default' | 'primary' | 'text' | 'link';
export type ButtonSize = 'large' | 'middle' | 'small';
export type IconPosition = 'start' | 'end';

export interface ButtonProps extends TouchableOpacityProps {
    style?: StyleProp<ViewStyle>;
    componentStyles?: any;
    type?: ButtonType;
    loading?: boolean;
    ghost?: boolean;
    danger?: boolean;
    disabled?: boolean;
    icon?: React.ReactNode;
    iconPosition?: IconPosition;
    size?: ButtonSize;
}
