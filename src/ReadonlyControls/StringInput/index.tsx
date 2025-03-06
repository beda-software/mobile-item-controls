import React from 'react';

import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { Text, View } from 'react-native';

import { Widget } from '../Widget';

export function StringInput(props: QuestionItemProps) {
    const { questionItem, parentPath } = props;

    const { value } = useFieldController<string>(
        [...parentPath, questionItem.linkId, 0, 'value', 'string'],
        questionItem
    );

    return (
        <Widget title={questionItem.text!}>
            <View>
                <Text>{value}</Text>
            </View>
        </Widget>
    );
}
