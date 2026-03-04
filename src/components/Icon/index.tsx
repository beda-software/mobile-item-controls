import { StyleProp, TextStyle } from 'react-native';

import { S } from './styles';

export interface IconProps {
    style?: StyleProp<TextStyle>;
    name: string;
    fontSize?: number;
    fontWeight?: 300 | 400 | 500 | 600 | 700;
    color?: string;
}

export function Icon({ name, fontSize = 24, fontWeight = 300, style, color }: IconProps) {
    return (
        <S.Icon $fontSize={fontSize} $fontWeight={fontWeight} $color={color} style={style}>
            {name}
        </S.Icon>
    );
}
