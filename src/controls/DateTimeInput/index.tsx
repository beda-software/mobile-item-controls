import React, { useEffect, useState } from 'react';

import {
    getFieldErrorMessage,
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import DatePicker from 'react-native-date-picker';

import { formatValueForDisplay, useControlConfig } from '../../control-config';
import { BaseControl } from '../BaseControl';
import { S } from '../styles';

export function DateTimeInput(props: QuestionItemProps) {
    const { questionItem, parentPath } = props;
    const { linkId, type, readOnly = false } = questionItem;
    const fieldPath = [...parentPath, linkId, 0, 'value', type];
    const field = useFieldController<string>(fieldPath, questionItem);
    const { value, onChange, fieldState } = field;
    const error = getFieldErrorMessage(field, fieldState, questionItem.text);

    const config = useControlConfig();

    const [showPicker, setShowPicker] = useState(false);
    const [date, setDate] = useState(
        value !== undefined ? parseDateValue(value, type) : undefined
    );

    const storedValue =
        date !== undefined ? formatDateValue(date, type) : undefined;
    const displayValue =
        storedValue !== undefined
            ? formatValueForDisplay(storedValue, type, config)
            : undefined;

    useEffect(() => {
        if (value !== undefined) {
            setDate(parseDateValue(value, type));
        }
    }, [value, type]);

    const onConfirm = (selectedDate: Date) => {
        setDate(selectedDate);
        onChange(formatDateValue(selectedDate, type));
        setShowPicker(false);
    };

    return (
        <BaseControl
            {...props}
            onFocus={() => !readOnly && setShowPicker(true)}
            isActive={showPicker}
            error={error}
        >
            <S.InputContentRow>
                <S.SelectInput>
                    <S.SelectInputText>{displayValue}</S.SelectInputText>
                </S.SelectInput>
                <S.SelectInputDropdownIconWrapper>
                    <S.SelectInputDropdownIcon />
                </S.SelectInputDropdownIconWrapper>
            </S.InputContentRow>
            {showPicker && (
                <DatePicker
                    modal
                    open={showPicker}
                    date={date ?? new Date()}
                    mode={getPickerMode(type)}
                    onConfirm={onConfirm}
                    onCancel={() => setShowPicker(false)}
                />
            )}
        </BaseControl>
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
