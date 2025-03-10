import { PropsWithChildren } from 'react';

import { Button, StyleSheet, View } from 'react-native';
import { WidgetStyles } from './types';
import { renderText } from '../components/TextRender';

interface Props extends PropsWithChildren {
    title?: string;
    nextDisabled?: boolean;
    onPressNext?: () => void;
    continueButtonText?: string;
    widgetStyles?: WidgetStyles;
}

export function Widget({
    children,
    title,
    nextDisabled = true,
    onPressNext,
    continueButtonText,
    widgetStyles,
}: Props) {
    return (
        <View style={widgetStyles?.wrapper ?? defaultStyles.main}>
            {title ? (
                <View
                    style={
                        widgetStyles?.titleContainer ??
                        defaultStyles.titleContainer
                    }
                >
                    {renderText(
                        title,
                        widgetStyles?.titleText ?? defaultStyles.title
                    )}
                </View>
            ) : null}
            <View>{children}</View>
            {onPressNext && (
                <View
                    style={
                        widgetStyles?.continueButtonContainer ??
                        defaultStyles.continueButtonContainer
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

const defaultStyles = StyleSheet.create({
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
