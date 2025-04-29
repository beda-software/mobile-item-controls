import React from 'react';

import { QuestionItemProps } from '@beda.software/fhir-questionnaire';
import { View } from 'react-native';

import { renderText } from '../../components/TextRender';
import { styles } from '../styles';

export function Display({ questionItem }: QuestionItemProps) {
    if (questionItem.hidden) {
        return null;
    }

    return (
        <View style={styles.container}>
            {renderText(questionItem.text, styles.text)}
            {renderText(questionItem.helpText)}
        </View>
    );
}
