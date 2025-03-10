import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';

export const renderText = (text?: string, style?: StyleProp<TextStyle>) => {
    if (text) {
        return text
            .split('\n')
            .filter(Boolean)
            .map((textPart, index) => (
                <Text key={index} style={style}>
                    {textPart}
                </Text>
            ));
    }
    return '';
};
