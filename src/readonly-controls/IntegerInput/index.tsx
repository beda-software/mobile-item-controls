import React from 'react';

import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { Text, View } from 'react-native';
import { renderText } from '../../components/TextRender';
import { Widget } from '../Widget';

interface IntegerInputProps extends QuestionItemProps {
    useWidget?: boolean;
}

export function IntegerInput({
    questionItem,
    parentPath,
    useWidget = false,
}: IntegerInputProps) {
    const { value } = useFieldController<number>(
        [...parentPath, questionItem.linkId, 0, 'value', 'integer'],
        questionItem
    );

    const content = (
        <View>
            {renderText(questionItem.text)}
            <Text>{value}</Text>
        </View>
    );

    if (questionItem.hidden) {
        return null;
    }

    return useWidget ? (
        <Widget title={questionItem.text!}>{content}</Widget>
    ) : (
        content
    );
}
