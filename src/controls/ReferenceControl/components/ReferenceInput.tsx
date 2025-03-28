import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { QuestionnaireItemAnswerOption } from '@beda.software/fhir-questionnaire/contrib/aidbox';
import { styles } from '../../styles';

interface ReferenceInputProps {
    value: QuestionnaireItemAnswerOption[];
    searchText: string;
    setSearchText: (text: string) => void;
    setShowOptions: (show: boolean) => void;
    onRemove: (index: number) => void;
    onBlur: () => void;
    repeats?: boolean;
}

export function ReferenceInput({
    value,
    searchText,
    setSearchText,
    setShowOptions,
    onRemove,
    onBlur,
    repeats,
}: ReferenceInputProps) {
    return (
        <View
            style={[styles.inputContainer, repeats && styles.repeatsContainer]}
        >
            {repeats &&
                value.map((item, index) => (
                    <View key={index} style={styles.chip}>
                        <Text style={styles.chipText}>
                            {item.value?.Reference?.display || ''}
                        </Text>
                        <TouchableOpacity
                            onPress={() => onRemove(index)}
                            style={styles.chipClose}
                        >
                            <Text>✕</Text>
                        </TouchableOpacity>
                    </View>
                ))}

            <TextInput
                style={styles.inputText}
                placeholder="Search..."
                value={searchText}
                onChangeText={(text) => {
                    setSearchText(text);
                    setShowOptions(true);
                }}
                onFocus={() => setShowOptions(true)}
                onBlur={onBlur}
            />
        </View>
    );
}
