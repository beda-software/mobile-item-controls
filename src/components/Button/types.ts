import { ReactNode } from "react";

export type ButtonType = 'default' | 'primary' | 'text' | 'link';
export type ButtonSize = 'large' | 'middle' | 'small';
export type IconPosition = 'start' | 'end';

export interface ButtonProps {
    type?: ButtonType;
    loading?: boolean;
    ghost?: boolean;
    danger?: boolean;
    disabled?: boolean;
    icon?: ReactNode;
    iconPosition?: IconPosition;
    size?: ButtonSize;
    onPress?: () => void;
    children?: ReactNode;
}