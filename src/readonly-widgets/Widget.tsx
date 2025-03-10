import React, { PropsWithChildren } from 'react';
import { View } from 'react-native';
import { renderText } from '../components/TextRender';

export type WidgetProps = PropsWithChildren & {
    title: string;
};

export function Widget({ children, title }: WidgetProps) {
    return (
        <View>
            <View>{renderText(title)}</View>
            <View>{children}</View>
        </View>
    );
}
