import React from 'react';

import { Icon } from '../Icon';
import { getTagColors } from './colors';
import { S } from './styles';
import { TagProps } from './types';

export type { TagProps, TagColor, TagType } from './types';

export function Tag({ label, color = 'gray', type = 'border', icon, closable = false, onClose, isDark = false, style }: TagProps) {
    const { bg, border, text } = getTagColors(color, type, isDark);

    const renderIcon = () => {
        if (!icon) return null;
        if (typeof icon === 'string') {
            return <Icon name={icon} fontSize={12} color={text} />;
        }
        return icon;
    };

    return (
        <S.Container $bgColor={bg} $borderColor={border} style={style}>
            {renderIcon()}
            <S.Label $color={text}>{label}</S.Label>
            {closable && (
                <S.CloseButton onPress={onClose}>
                    <Icon name="close" fontSize={10} color={text} />
                </S.CloseButton>
            )}
        </S.Container>
    );
}
