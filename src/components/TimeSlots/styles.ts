import styled from 'styled-components/native';

export const S = {
    Container: styled.View`
        width: 100%;
    `,

    /** Groups laid out as rows (stacked vertically, slots flow horizontally within each row) */
    GroupsHorizontal: styled.View`
        flex-direction: column;
        gap: ${({ theme }) => theme.components.TimeSlots?.groupGap ?? 12}px;
    `,

    /** Groups laid out as columns (side-by-side, slots stacked vertically within each column) */
    GroupsVertical: styled.View`
        flex-direction: row;
        gap: ${({ theme }) => theme.components.TimeSlots?.groupGap ?? 12}px;
    `,

    /** A single group wrapper */
    Group: styled.View`
        flex: 1;
        gap: 12px;
    `,

    GroupTitle: styled.Text`
        font-size: ${({ theme }) =>
            theme.components.TimeSlots?.groupHeaderFontSize ?? 14}px;
        font-weight: ${({ theme }) =>
            theme.components.TimeSlots?.groupHeaderFontWeight ?? '600'};
        text-align: center;
        color: ${({ theme }) => theme.components.Global.colorText};
        margin-bottom: 4px;
    `,

    /** Horizontal row of slots (for flat mode or horizontal group direction) */
    SlotsRow: styled.View`
        flex-direction: row;
        flex-wrap: wrap;
        gap: ${({ theme }) => theme.components.TimeSlots?.gap ?? 8}px;
    `,

    /** Vertical column of slots (for vertical group direction) */
    SlotsColumn: styled.View`
        flex-direction: column;
        gap: ${({ theme }) => theme.components.TimeSlots?.gap ?? 8}px;
    `,

    SlotButton: styled.TouchableOpacity<{
        $selected?: boolean;
        $disabled?: boolean;
    }>`
        align-items: center;
        justify-content: center;
        padding-block: ${({ theme }) =>
            theme.components.TimeSlots?.paddingBlock ?? 12}px;
        padding-inline: ${({ theme }) =>
            theme.components.TimeSlots?.paddingInline ?? 20}px;
        border-radius: ${({ theme }) =>
            theme.components.TimeSlots?.Global?.borderRadius ??
            theme.components.Global.borderRadius}px;
        border-width: ${({ theme }) => theme.components.Global.borderWidth}px;
        border-color: ${({ theme, $selected }) =>
            $selected
                ? (theme.components.TimeSlots?.selectedBorderColor ?? '#3366FF')
                : (theme.components.TimeSlots?.Global?.colorBorder ??
                  theme.components.Global.colorBorder)};
        background-color: ${({ theme, $selected }) =>
            $selected
                ? (theme.components.TimeSlots?.selectedBg ?? '#3366FF')
                : (theme.components.TimeSlots?.Global?.colorBgContainer ??
                  theme.components.Global.colorBgContainer)};
        opacity: ${({ $disabled }) => ($disabled ? 0.4 : 1)};
    `,

    SlotText: styled.Text<{ $selected?: boolean }>`
        font-size: ${({ theme }) =>
            theme.components.TimeSlots?.Global?.fontSize ??
            theme.components.Global.fontSize}px;
        font-weight: 500;
        color: ${({ theme, $selected }) =>
            $selected
                ? (theme.components.TimeSlots?.selectedTextColor ?? 'white')
                : theme.components.Global.colorText};
    `,
};
