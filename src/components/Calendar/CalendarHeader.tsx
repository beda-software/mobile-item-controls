import { useState } from 'react';

import { MonthYearPicker } from './MonthYearPicker';
import { S } from './styles';
import { CalendarViewMode } from './types';
import { formatMonthYear } from './utils';

interface CalendarHeaderProps {
    currentMonth: string;
    viewMode: CalendarViewMode;
    onPressLeft: () => void;
    onPressRight: () => void;
    onToggleView: () => void;
    onMonthYearSelect: (dateString: string) => void;
}

export function CalendarHeader({
    currentMonth,
    viewMode,
    onPressLeft,
    onPressRight,
    onToggleView,
    onMonthYearSelect,
}: CalendarHeaderProps) {
    const [pickerVisible, setPickerVisible] = useState(false);

    const handleMonthYearPress = () => {
        setPickerVisible(true);
    };

    const handlePickerSelect = (dateString: string) => {
        setPickerVisible(false);
        onMonthYearSelect(dateString);
    };

    return (
        <S.HeaderContainer>
            <S.HeaderLeft>
                <S.HeaderMonthText onPress={handleMonthYearPress}>
                    {formatMonthYear(currentMonth)}
                </S.HeaderMonthText>
                <S.HeaderCaretButton onPress={onToggleView} activeOpacity={0.6}>
                    <S.HeaderCaret>{viewMode === 'month' ? '∧' : '∨'}</S.HeaderCaret>
                </S.HeaderCaretButton>
            </S.HeaderLeft>
            <S.HeaderRight>
                <S.HeaderArrowButton onPress={onPressLeft} activeOpacity={0.6}>
                    <S.HeaderArrow>{'‹'}</S.HeaderArrow>
                </S.HeaderArrowButton>
                <S.HeaderArrowButton onPress={onPressRight} activeOpacity={0.6}>
                    <S.HeaderArrow>{'›'}</S.HeaderArrow>
                </S.HeaderArrowButton>
            </S.HeaderRight>

            <MonthYearPicker
                visible={pickerVisible}
                currentDate={currentMonth}
                onSelect={handlePickerSelect}
                onClose={() => setPickerVisible(false)}
            />
        </S.HeaderContainer>
    );
}
