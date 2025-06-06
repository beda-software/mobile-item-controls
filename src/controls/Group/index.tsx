import React from 'react';

import { GroupItemProps } from '@beda.software/fhir-questionnaire/components/QuestionnaireResponseForm/BaseQuestionnaireResponseForm/GroupComponent';
import { Text, View, TouchableOpacity } from 'react-native';

import { renderText } from '../../components/TextRender';
import { styles } from '../styles';

export function Group({
    questionItem,
    children,
    addItem,
    removeItem,
}: GroupItemProps) {
    const addButtonText = 'Add';
    const { item, text, helpText, repeats } = questionItem;

    const childrenArray = Array.isArray(children) ? children : [children];
    const isRemovable = repeats && childrenArray.length > 1;

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {renderText(text, styles.text)}
                {renderText(helpText)}
            </View>

            {item &&
                childrenArray.map((child, index) => (
                    <View key={index}>
                        {isRemovable ? (
                            <TouchableOpacity
                                activeOpacity={1}
                                onPress={() => removeItem?.(index)}
                                style={{ height: 14 }}
                            >
                                <Text style={{ textAlign: 'right' }}>X</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={{ height: 14 }} />
                        )}
                        {child}
                    </View>
                ))}

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
