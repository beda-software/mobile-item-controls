import React from 'react';

import { StyleProp, ViewStyle } from 'react-native';

export type TagColor =
    | 'gray'
    | 'red'
    | 'volcano'
    | 'orange'
    | 'gold'
    | 'yellow'
    | 'lime'
    | 'green'
    | 'cyan'
    | 'geekblue'
    | 'blue'
    | 'purple'
    | 'magenta';

export type TagType = 'solid' | 'border' | 'borderless';

export interface TagProps {
    label: string;
    color?: TagColor;
    type?: TagType;
    icon?: React.ReactNode | string;
    closable?: boolean;
    onClose?: () => void;
    isDark?: boolean;
    style?: StyleProp<ViewStyle>;
}

export interface ColorConfig {
    bg: string;
    border?: string;
    text: string;
}
