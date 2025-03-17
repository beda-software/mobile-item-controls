import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import React from 'react';
import { View, Switch } from 'react-native';
import { renderText } from '../../components/TextRender';
import { styles } from '../styles';

export function BooleanInput({ questionItem, parentPath }: QuestionItemProps) {
    const { linkId, text } = questionItem;
    const field = [...parentPath, linkId, 0, 'value', 'boolean'];
    const { value, onChange } = useFieldController<boolean>(
        field,
        questionItem
    );

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {renderText(text, styles.text)}
                {renderText(questionItem.helpText)}
            </View>
            <Switch value={Boolean(value)} onValueChange={onChange} />
        </View>
    );
}
