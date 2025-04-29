import React from 'react';

import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { Text, View } from 'react-native';
import { renderText } from '../../components/TextRender';
import { Widget } from '../Widget';

interface StringInputProps extends QuestionItemProps {
    useWidget?: boolean;
}

export function StringInput({
    questionItem,
    parentPath,
    useWidget = false,
}: StringInputProps) {
    const { value } = useFieldController<string>(
        [...parentPath, questionItem.linkId, 0, 'value', 'string'],
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
