import { QuestionnaireItemAnswerOptionValue } from '@beda.software/fhir-questionnaire/contrib/aidbox';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles';
import { extractKeyFromValue, getAnswerDisplay } from './utils';

interface ChoiceOptionProps {
    isSelected: boolean;
    onSelect: () => void;
    value?: QuestionnaireItemAnswerOptionValue;
}

export const ChoiceOption = ({
    isSelected,
    onSelect,
    value,
}: ChoiceOptionProps) => {
    const key = value ? extractKeyFromValue(value) : undefined;

    return (
        <TouchableOpacity
            onPress={onSelect}
            style={styles.selectOptionContainer}
        >
            <View
                style={[
                    styles.selectBackground,
                    isSelected && styles.isSelectedBackground,
                ]}
            />
            <Text style={styles.selectText}>
                {key ? getAnswerDisplay(key, value) : ''}
            </Text>
        </TouchableOpacity>
    );
};
