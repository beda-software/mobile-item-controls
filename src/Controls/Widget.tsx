import { PropsWithChildren } from 'react';

import {
    Text,
    View,
    StyleSheet,
    Button,
    StyleProp,
    TextStyle,
} from 'react-native';
import { WidgetStyles } from './types';

export type WidgetProps = PropsWithChildren & {
    title?: string;
    nextDisabled?: boolean;
    onPressNext?: () => void;
    continueButtonText?: string;
    widgetStyles?: WidgetStyles;
};

export function Widget({
    children,
    title,
    nextDisabled = true,
    onPressNext,
    continueButtonText,
    widgetStyles,
}: WidgetProps) {
    return (
        <View style={widgetStyles?.wrapper ?? styles.main}>
            {title ? (
                <View
                    style={
                        widgetStyles?.titleContainer ?? styles.titleContainer
                    }
                >
                    {renderTitle(title, widgetStyles?.titleText)}
                </View>
            ) : null}
            <View>{children}</View>
            {onPressNext && (
                <View
                    style={
                        widgetStyles?.continueButtonContainer ??
                        styles.continueButtonContainer
                    }
                >
                    <Button
                        title={continueButtonText ?? 'Continue'}
                        onPress={onPressNext}
                        disabled={nextDisabled}
                    />
                </View>
            )}
        </View>
    );
}

const renderTitle = (title: string, titleStyle?: StyleProp<TextStyle>) =>
    title
        .split('\n')
        .filter(Boolean)
        .map((textPart, index) => (
            <Text key={index} style={titleStyle ?? styles.title}>
                {textPart}
            </Text>
        ));

const styles = StyleSheet.create({
    main: {
        flex: 1,
        padding: 24,
    },
    titleContainer: {
        marginVertical: 8,
    },
    title: {
        fontSize: 26,
    },
    continueButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
    },
});
