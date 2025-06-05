import React, { useState } from 'react';

import {
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import { Text, View } from 'react-native';
import DatePicker from 'react-native-date-picker';

import { renderText } from '../../components/TextRender';
import { S, styles } from '../styles';

export function DateTimeInput({ questionItem, parentPath }: QuestionItemProps) {
    const { linkId, type, readOnly } = questionItem;
    const field = [...parentPath, linkId, 0, 'value', type];
    const { value, onChange } = useFieldController<string>(field, questionItem);

    const [showPicker, setShowPicker] = useState(false);
    const [date, setDate] = useState(parseDateValue(value, type));

    const onConfirm = (selectedDate: Date) => {
        setDate(selectedDate);
        onChange(formatDateValue(selectedDate, type));
        setShowPicker(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                {renderText(questionItem.text, styles.text)}
                {renderText(questionItem.helpText)}
            </View>

            <S.InputWrapper
                activeOpacity={1}
                onPress={() => setShowPicker(true)}
                $readOnly={readOnly}
                $active={showPicker}
            >
                <Text style={styles.inputText}>
                    {formatDateValue(date, type)}
                </Text>
            </S.InputWrapper>

            {showPicker && (
                <DatePicker
                    modal
                    open={showPicker}
                    date={date}
                    mode={getPickerMode(type)}
                    onConfirm={onConfirm}
                    onCancel={() => setShowPicker(false)}
                />
            )}
        </View>
    );
}

const parseDateValue = (value: string | undefined, type: string) => {
    if (!value) return new Date();

    if (type === 'time') {
        const [hours, minutes, seconds] = value.split(':').map(Number);
        const now = new Date();
        now.setHours(hours, minutes, seconds || 0, 0);
        return now;
    }
    return new Date(value);
};

const formatDateValue = (selectedDate: Date, type: string) => {
    switch (type) {
        case 'dateTime':
            return selectedDate.toISOString();
        case 'date':
            return selectedDate.toISOString().split('T')[0];
        case 'time': {
            const hours = String(selectedDate.getHours()).padStart(2, '0');
            const minutes = String(selectedDate.getMinutes()).padStart(2, '0');
            const seconds = String(selectedDate.getSeconds()).padStart(2, '0');
            return `${hours}:${minutes}:${seconds}`;
        }
        default:
            return undefined;
    }
};

const getPickerMode = (type: string) => {
    return type === 'dateTime' ? 'datetime' : type === 'time' ? 'time' : 'date';
};
