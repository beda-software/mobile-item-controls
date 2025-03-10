import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface WidgetStyles {
    wrapper?: StyleProp<ViewStyle>;
    titleContainer?: StyleProp<ViewStyle>;
    titleText?: StyleProp<TextStyle>;
    continueButtonContainer?: StyleProp<ViewStyle>;
}

export interface StringInputStyles {
    container?: StyleProp<ViewStyle>;
    value?: StyleProp<TextStyle>;
}

export interface IntegerInputStyles {
    container?: StyleProp<ViewStyle>;
    value?: StyleProp<TextStyle>;
}
