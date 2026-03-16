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
    canGoBack?: boolean;
    canGoForward?: boolean;
    showMonthYearPicker?: boolean;
}

export function CalendarHeader({
    currentMonth,
    viewMode,
    onPressLeft,
    onPressRight,
    onToggleView,
    onMonthYearSelect,
    canGoBack = true,
    canGoForward = true,
    showMonthYearPicker = true,
}: CalendarHeaderProps) {
    const [pickerVisible, setPickerVisible] = useState(false);

    const handleMonthYearPress = () => {
        if (showMonthYearPicker) {
            setPickerVisible(true);
        }
    };

    const handlePickerSelect = (dateString: string) => {
        setPickerVisible(false);
        onMonthYearSelect(dateString);
    };

    return (
        <S.HeaderContainer>
            <S.HeaderLeft>
                <S.HeaderMonthButton
                    onPress={handleMonthYearPress}
                    activeOpacity={showMonthYearPicker ? 0.6 : 1}
                    disabled={!showMonthYearPicker}
                >
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
                <S.HeaderArrowButton
                    onPress={onPressLeft}
                    activeOpacity={0.6}
                    disabled={!canGoBack}
                >
                    <S.HeaderArrowIcon name="chevron_left" $disabled={!canGoBack} />
                </S.HeaderArrowButton>
                <S.HeaderArrowButton
                    onPress={onPressRight}
                    activeOpacity={0.6}
                    disabled={!canGoForward}
                >
                    <S.HeaderArrowIcon name="chevron_right" $disabled={!canGoForward} />
                </S.HeaderArrowButton>
            </S.HeaderRight>

            {showMonthYearPicker && (
                <MonthYearPicker
                    visible={pickerVisible}
                    currentDate={currentMonth}
                    onSelect={handlePickerSelect}
                    onClose={() => setPickerVisible(false)}
                />
            )}
        </S.HeaderContainer>
    );
}
