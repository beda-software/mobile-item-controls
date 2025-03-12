import React, { PropsWithChildren } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { styles } from '../styles';
import { GroupItemProps } from '@beda.software/fhir-questionnaire/vendor/sdc-qrf';

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
                {text && <Text style={styles.text}>{text}</Text>}
                {helpText && <Text>{helpText}</Text>}
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
