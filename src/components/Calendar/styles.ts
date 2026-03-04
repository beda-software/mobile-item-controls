import styled from 'styled-components/native';

export const S = {
    // Calendar container
    Container: styled.View`
        overflow: hidden;
        padding-bottom: 16px;
    `,

    // Header
    HeaderContainer: styled.View`
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        height: 44px;
    `,
    HeaderLeft: styled.View`
        flex-direction: row;
        align-items: center;
    `,
    HeaderMonthButton: styled.TouchableOpacity`
        padding: 4px;
    `,
    HeaderMonthText: styled.Text`
        font-size: 16px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.88);
    `,
    HeaderCaretButton: styled.TouchableOpacity`
        width: 40px;
        height: 40px;
        justify-content: center;
        align-items: center;
    `,
    HeaderRight: styled.View`
        flex-direction: row;
        align-items: center;
        gap: 2px;
    `,
    HeaderArrowButton: styled.TouchableOpacity`
        width: 40px;
        height: 40px;
        justify-content: center;
        align-items: center;
    `,

    // Day component
    DayContainer: styled.TouchableOpacity<{
        $isToday?: boolean;
        $isSelected?: boolean;
    }>`
        width: 44px;
        height: 44px;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
        ${({ $isToday, $isSelected }) =>
            $isToday && !$isSelected
                ? 'border-width: 1px; border-color: #3366FF;'
                : ''}
        ${({ $isSelected }) =>
            $isSelected ? 'background-color: #3366FF;' : ''}
    `,
    DayEmptyContainer: styled.View`
        width: 44px;
        height: 44px;
        justify-content: center;
        align-items: center;
        border-radius: 12px;
    `,
    DayText: styled.Text<{
        $isToday?: boolean;
        $isSelected?: boolean;
        $isDisabled?: boolean;
        $isOutsideMonth?: boolean;
    }>`
        font-size: 17px;
        line-height: 24px;
        font-weight: 400;
        color: ${({ $isSelected, $isDisabled, $isOutsideMonth }) => {
            if ($isSelected) return '#FFFFFF';
            if ($isDisabled || $isOutsideMonth) return 'rgba(0, 0, 0, 0.25)';
            return 'rgba(0, 0, 0, 0.88)';
        }};
    `,

    // Month/Year Picker Modal
    PickerOverlay: styled.TouchableOpacity`
        flex: 1;
        background-color: rgba(0, 0, 0, 0.3);
        justify-content: center;
        align-items: center;
    `,
    PickerContainer: styled.TouchableOpacity`
        background-color: #ffffff;
        border-radius: 16px;
        padding: 20px;
        width: 300px;
        shadow-color: #000;
        shadow-offset: 0px 2px;
        shadow-opacity: 0.15;
        shadow-radius: 8px;
        elevation: 5;
    `,
    PickerYearRow: styled.View`
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    `,
    PickerYearText: styled.Text`
        font-size: 18px;
        font-weight: 700;
        color: #1a1a2e;
    `,
    PickerYearArrow: styled.TouchableOpacity`
        width: 40px;
        height: 40px;
        justify-content: center;
        align-items: center;
    `,
    PickerMonthGrid: styled.View`
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;
    `,
    PickerMonthItem: styled.TouchableOpacity<{
        $isSelected?: boolean;
    }>`
        width: 30%;
        padding: 10px 0;
        border-radius: 10px;
        align-items: center;
        margin-bottom: 8px;
        ${({ $isSelected }) =>
            $isSelected ? 'background-color: #3366FF;' : ''}
    `,
    PickerMonthText: styled.Text<{
        $isSelected?: boolean;
    }>`
        font-size: 14px;
        font-weight: ${({ $isSelected }) => ($isSelected ? '600' : '500')};
        color: ${({ $isSelected }) => ($isSelected ? '#FFFFFF' : '#1A1A2E')};
    `,

    // Week day names row
    WeekDayNamesRow: styled.View`
        flex-direction: row;
        justify-content: space-around;
        height: 44px;
        align-items: center;
    `,
    WeekDayCellsRow: styled.View`
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
    `,
    WeekDayName: styled.Text`
        width: 44px;
        text-align: center;
        font-size: 17px;
        line-height: 22px;
        font-weight: 400;
        color: rgba(0, 0, 0, 0.45);
    `,
};
