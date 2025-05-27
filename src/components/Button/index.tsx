import React from 'react';

import _ from 'lodash';
import { ActivityIndicator, Image } from 'react-native';

import { DefaultButtonStyles } from './default-styles';
import { LinkButtonStyles } from './link-styles';
import { PrimaryButtonStyles } from './primary-styles';
import { TextButtonStyles } from './text-styles';
import { ButtonProps, ButtonType } from './types';

export function Button(props: ButtonProps) {
    const {
        style,
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

    const stylesMap: {
        [key in ButtonType]: {
            styles: any;
        };
    } = {
        default: {
            styles: DefaultButtonStyles,
        },
        primary: {
            styles: PrimaryButtonStyles,
        },
        link: {
            styles: LinkButtonStyles,
        },
        text: {
            styles: TextButtonStyles,
        },
    };

    const S = stylesMap[type].styles;

    const renderIcon = () => {
        if (!icon) {
            return null;
        }

        return <Image source={icon} />;
    };

    return (
        <S.Container
            style={style}
            $type={type}
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
                    $type={type}
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

            {!loading && iconPosition === 'end' && renderIcon()}
        </S.Container>
    );
}
