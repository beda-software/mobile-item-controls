import { useCallback, useMemo, useState } from 'react';

import {
    addDays,
    format,
    getMonth,
    getYear,
    startOfWeek,
} from 'date-fns';
import { View } from 'react-native';
import { Calendar as RNCalendar, DateData } from 'react-native-calendars';

import { CalendarHeader } from './CalendarHeader';
import { DayComponent } from './DayComponent';
import { S } from './styles';
import { CalendarProps, CalendarViewMode } from './types';
import { getTodayString, getNextMonth, getPrevMonth, parseDateString, formatDateString } from './utils';

const CALENDAR_THEME = {
    calendarBackground: 'transparent',
    textSectionTitleColor: '#8F9BB3',
    textDayHeaderFontSize: 13,
    textDayHeaderFontWeight: '500' as const,
    textDayFontSize: 16,
    'stylesheet.calendar.header': {
        header: {
            padding: 0,
            margin: 0,
            height: 0,
            overflow: 'hidden' as const,
        },
        partialHeader: {
            paddingHorizontal: 0,
        },
    },
    'stylesheet.calendar.main': {
        container: {
            padding: 0,
            paddingLeft: 0,
            paddingRight: 0,
        },
        monthView: {
            padding: 0,
            margin: 0,
        },
        week: {
            marginTop: 0,
            marginBottom: 0,
            paddingTop: 0,
            paddingBottom: 0,
            flexDirection: 'row',
            justifyContent: 'space-around',
        },
    },
};

/**
 * Get the week dates array for a given reference date
 */
function getWeekDates(referenceDate: string, firstDay: number): string[] {
    const refDate = parseDateString(referenceDate);
    const weekStartDay = firstDay as 0 | 1 | 2 | 3 | 4 | 5 | 6;
    const weekStart = startOfWeek(refDate, { weekStartsOn: weekStartDay });

    const dates: string[] = [];
    for (let i = 0; i < 7; i++) {
        dates.push(formatDateString(addDays(weekStart, i)));
    }
    return dates;
}

export function Calendar({
    value,
    onChange,
    firstDay = 1,
    minDate,
    maxDate,
    showMonthYearPicker = true,
}: CalendarProps) {
    const today = getTodayString();
    const [currentMonth, setCurrentMonth] = useState(value || today);
    const [viewMode, setViewMode] = useState<CalendarViewMode>('month');
    const [weekAnchor, setWeekAnchor] = useState('');

    const selectedDate = value || '';

    const markedDates = useMemo(() => {
        const marks: Record<string, { selected?: boolean; selectedColor?: string }> = {};
        if (selectedDate) {
            marks[selectedDate] = {
                selected: true,
                selectedColor: '#3366FF',
            };
        }
        return marks;
    }, [selectedDate]);

    const handleDayPress = useCallback(
        (day: DateData) => {
            onChange(day.dateString);
        },
        [onChange],
    );

    const handleDayComponentPress = useCallback(
        (dateString: string) => {
            onChange(dateString);
        },
        [onChange],
    );

    const handlePressLeft = useCallback(() => {
        if (viewMode === 'week') {
            setWeekAnchor((prev) => {
                const d = parseDateString(prev || today);
                return formatDateString(addDays(d, -7));
            });
        } else {
            const prev = getPrevMonth(currentMonth);
            setCurrentMonth(prev);
        }
    }, [currentMonth, viewMode, today]);

    const handlePressRight = useCallback(() => {
        if (viewMode === 'week') {
            setWeekAnchor((prev) => {
                const d = parseDateString(prev || today);
                return formatDateString(addDays(d, 7));
            });
        } else {
            const next = getNextMonth(currentMonth);
            setCurrentMonth(next);
        }
    }, [currentMonth, viewMode, today]);

    const handleToggleView = useCallback(() => {
        setViewMode((mode) => {
            if (mode === 'month') {
                // Anchor the week view on the selected date, or today
                setWeekAnchor(selectedDate || today);
                return 'week';
            }
            return 'month';
        });
    }, [selectedDate, today]);

    const handleMonthYearSelect = useCallback((dateString: string) => {
        setCurrentMonth(dateString);
        setWeekAnchor(dateString);
    }, []);

    const handleMonthChange = useCallback((date: DateData) => {
        setCurrentMonth(date.dateString);
    }, []);

    // Day names header
    const dayNames = useMemo(() => {
        const names = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        return [...names.slice(firstDay), ...names.slice(0, firstDay)];
    }, [firstDay]);

    // Compute which week to show in week view
    const weekDates = useMemo(() => {
        if (viewMode !== 'week') return [];

        const anchor = weekAnchor || selectedDate || today;
        return getWeekDates(anchor, firstDay);
    }, [viewMode, weekAnchor, selectedDate, today, firstDay]);

    const canGoBack = useMemo(() => {
        if (viewMode === 'week') {
            if (!weekDates.length) return true;
            return !minDate || weekDates[0] > minDate;
        }
        return !minDate || currentMonth.slice(0, 7) > minDate.slice(0, 7);
    }, [viewMode, weekDates, currentMonth, minDate]);

    const canGoForward = useMemo(() => {
        if (viewMode === 'week') {
            if (!weekDates.length) return true;
            return !maxDate || weekDates[6] < maxDate;
        }
        return !maxDate || currentMonth.slice(0, 7) < maxDate.slice(0, 7);
    }, [viewMode, weekDates, currentMonth, maxDate]);

    // In week view, derive the displayed month from the week's dates
    const displayedMonth = useMemo(() => {
        if (viewMode === 'week' && weekDates.length > 0) {
            // Use the middle day of the week to determine month label
            const midDate = parseDateString(weekDates[3]);
            return format(midDate, 'yyyy-MM') + '-01';
        }
        return currentMonth;
    }, [viewMode, weekDates, currentMonth]);

    return (
        <S.Container>
            <CalendarHeader
                currentMonth={displayedMonth}
                viewMode={viewMode}
                onPressLeft={handlePressLeft}
                onPressRight={handlePressRight}
                onToggleView={handleToggleView}
                onMonthYearSelect={handleMonthYearSelect}
                canGoBack={canGoBack}
                canGoForward={canGoForward}
                showMonthYearPicker={showMonthYearPicker}
            />
            {/* Day name headers — shared for both views */}
            <S.WeekDayNamesRow>
                {dayNames.map((name) => (
                    <S.WeekDayName key={name}>{name}</S.WeekDayName>
                ))}
            </S.WeekDayNamesRow>
            {viewMode === 'month' ? (
                <RNCalendar
                    key={currentMonth}
                    current={currentMonth}
                    firstDay={firstDay}
                    minDate={minDate}
                    maxDate={maxDate}
                    markedDates={markedDates}
                    onDayPress={handleDayPress}
                    onMonthChange={handleMonthChange}
                    enableSwipeMonths
                    hideArrows
                    hideDayNames
                    renderHeader={() => null}
                    hideExtraDays={false}
                    dayComponent={({ date, state, marking }: any) => (
                        <DayComponent
                            date={date}
                            state={state}
                            marking={marking}
                            onPress={handleDayComponentPress}
                        />
                    )}
                    theme={CALENDAR_THEME}
                />
            ) : (
                <View>
                    {/* Week day cells */}
                    <S.WeekDayCellsRow>
                        {weekDates.map((dateString) => {
                            const date = parseDateString(dateString);
                            const day = date.getDate();
                            const month = getMonth(date) + 1;
                            const year = getYear(date);

                            // Determine the displayed month from the header
                            const displayedMonthNum = getMonth(parseDateString(displayedMonth)) + 1;
                            const isOutsideMonth = month !== displayedMonthNum;

                            return (
                                <DayComponent
                                    key={dateString}
                                    date={{
                                        day,
                                        month,
                                        year,
                                        timestamp: date.getTime(),
                                        dateString,
                                    }}
                                    state=""
                                    marking={
                                        selectedDate === dateString
                                            ? { selected: true, selectedColor: '#3366FF' }
                                            : undefined
                                    }
                                    onPress={handleDayComponentPress}
                                    isOutsideMonth={isOutsideMonth}
                                />
                            );
                        })}
                    </S.WeekDayCellsRow>
                </View>
            )}
        </S.Container>
    );
}
