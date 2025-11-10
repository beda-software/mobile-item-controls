import React from 'react';

import _ from 'lodash';
import { ActivityIndicator } from 'react-native';

import { FilledButtonStyles } from './filled-styles';
import { LinkButtonStyles } from './link-styles';
import { OutlinedButtonStyles } from './outlined-styles';
import { SolidButtonStyles } from './solid-styles';
import { TextButtonStyles } from './text-styles';
import { ButtonProps, ButtonType, ButtonVariant } from './types';

export function Button(props: ButtonProps) {
    const {
        style,
        componentStyles,
        variant,
        type = 'default',
        loading = false,
        ghost = false,
        danger = false,
        disabled = false,
        icon,
        iconPosition = 'start',
        size = 'middle',
        onPress,
        children,
    } = props;
    const isDisabled = disabled || loading;

    const typeStylesMap: {
        [key in ButtonType]: {
            styles: any;
        };
    } = {
        default: {
            styles: OutlinedButtonStyles,
        },
        primary: {
            styles: SolidButtonStyles,
        },
        link: {
            styles: LinkButtonStyles,
        },
        text: {
            styles: TextButtonStyles,
        },
    };

    const variantStylesMap: {
        [key in ButtonVariant]: {
            styles: any;
        };
    } = {
        solid: {
            styles: SolidButtonStyles,
        },
        filled: {
            styles: FilledButtonStyles,
        },
        outlined: {
            styles: OutlinedButtonStyles,
        },
        link: {
            styles: LinkButtonStyles,
        },
        text: {
            styles: TextButtonStyles,
        },
    };

    const S =
        componentStyles ??
        (variant ? variantStylesMap[variant].styles : undefined) ??
        typeStylesMap[type].styles;

    const renderIcon = () => {
        if (!icon) {
            return null;
        }

        return icon;
    };

    return (
        <S.Container
            style={style}
            $variant={variant}
            $ghost={ghost}
            $danger={danger}
            $size={size}
            disabled={isDisabled}
            onPress={isDisabled ? undefined : onPress}
            activeOpacity={isDisabled ? 1 : 0.7}
        >
            {loading && <ActivityIndicator size="small" />}

            {!loading && iconPosition === 'start' && renderIcon()}

            {_.isString(children) ? (
                <S.Text
                    $variant={variant}
                    $ghost={ghost}
                    $danger={danger}
                    $disabled={isDisabled}
                    $size={size}
                >
                    {children}
                </S.Text>
            ) : (
                children
            )}

            {iconPosition === 'end' && renderIcon()}
        </S.Container>
    );
}
