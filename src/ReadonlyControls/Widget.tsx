import React, { PropsWithChildren } from 'react';

import { View, Text } from 'react-native';

export type WidgetProps = PropsWithChildren & {
    title: string;
};

export function Widget({ children, title }: WidgetProps) {
    return (
        <View>
            <View>{renderTitle(title)}</View>
            <View>{children}</View>
        </View>
    );
}

const renderTitle = (title: string) =>
    title
        .split('\n')
        .filter(Boolean)
        .map((textPart, index) => <Text key={index}>{textPart}</Text>);
