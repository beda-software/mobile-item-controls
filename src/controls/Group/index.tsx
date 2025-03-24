import React, { PropsWithChildren } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { GroupItemProps } from 'sdc-qrf';
import { renderText } from '../../components/TextRender';

interface Props extends PropsWithChildren<GroupItemProps> {
    addItem?: () => void;
    addButtonText?: string;
}

export function Group({
    questionItem,
    children,
    addItem,
    addButtonText = 'Add',
}: Props) {
    const { item, text, helpText, repeats } = questionItem;

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {renderText(text, styles.text)}
                {renderText(helpText)}
            </View>

            {item && <View>{children}</View>}

            {repeats && (
                <TouchableOpacity
                    activeOpacity={1}
                    style={styles.addButtonContainer}
                    onPress={addItem}
                >
                    <Text style={styles.addButtonText}>{addButtonText}</Text>
                </TouchableOpacity>
            )}
        </View>
    );
}
