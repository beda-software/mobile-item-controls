import { useState } from 'react';

import { Icon } from '../Icon';
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
                <S.HeaderMonthButton onPress={handleMonthYearPress} activeOpacity={0.6}>
                    <S.HeaderMonthText>{formatMonthYear(currentMonth)}</S.HeaderMonthText>
                </S.HeaderMonthButton>
                <S.HeaderCaretButton onPress={onToggleView} activeOpacity={0.6}>
                    <Icon
                        name={viewMode === 'month' ? 'expand_less' : 'expand_more'}
                        fontSize={24}
                        fontWeight={300}
                        color="rgba(0, 0, 0, 0.45)"
                    />
                </S.HeaderCaretButton>
            </S.HeaderLeft>
            <S.HeaderRight>
                <S.HeaderArrowButton onPress={onPressLeft} activeOpacity={0.6}>
                    <Icon name="chevron_left" fontSize={24} fontWeight={300} color="rgba(0, 0, 0, 0.88)" />
                </S.HeaderArrowButton>
                <S.HeaderArrowButton onPress={onPressRight} activeOpacity={0.6}>
                    <Icon name="chevron_right" fontSize={24} fontWeight={300} color="rgba(0, 0, 0, 0.88)" />
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
