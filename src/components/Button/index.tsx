import React from 'react';

import _ from 'lodash';
import { ActivityIndicator } from 'react-native';

import { DefaultButtonStyles } from './default-styles';
import { LinkButtonStyles } from './link-styles';
import { PrimaryButtonStyles } from './primary-styles';
import { TextButtonStyles } from './text-styles';
import { ButtonProps, ButtonType } from './types';

export function Button(props: ButtonProps) {
    const {
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

    const stylesMap: { [key in ButtonType]: any } = {
        default: DefaultButtonStyles,
        primary: PrimaryButtonStyles,
        link: LinkButtonStyles,
        text: TextButtonStyles,
    };

    const S = stylesMap[type];

    return (
        <S.Container
            $type={type}
            $ghost={ghost}
            $danger={danger}
            $size={size}
            disabled={isDisabled}
            onPress={isDisabled ? undefined : onPress}
            activeOpacity={isDisabled ? 1 : 0.7}
        >
            {loading && (
                <S.Icon $position="start">
                    <ActivityIndicator size="small" />
                </S.Icon>
            )}

            {!loading && icon && iconPosition === 'start' && <S.Icon $position="start">{icon}</S.Icon>}

            {_.isString(children) ? (
                <S.Text $type={type} $ghost={ghost} $danger={danger} $disabled={isDisabled} $size={size}>
                    {children}
                </S.Text>
            ) : (
                children
            )}

            {!loading && icon && iconPosition === 'end' && <S.Icon $position="end">{icon}</S.Icon>}
        </S.Container>
    );
}
