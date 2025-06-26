import { StyleSheet, Text, TextInput, View } from 'react-native';
import styled from 'styled-components/native';

export const S = {
    Container: styled.View`
        margin: 8px 0;
        gap: 8px;
        position: relative;
    `,
    ContainerQuestionTextWrapper: styled.View`
        gap: 8px;
    `,
    ContainerQuestionText: styled.Text`
        font-size: 16px;
        font-weight: 600;
    `,
    ContainerQuestionHelpText: styled.Text``,
    ContainerErrorText: styled.Text`
        color: red;
    `,
    InputWrapper: styled.TouchableOpacity<{
        $readOnly?: boolean;
        $active?: boolean;
    }>`
        display: flex;
        flex-direction: row;
        border-radius: ${({ theme }) =>
            theme.components.Input?.Global?.borderRadius ??
            theme.components.Global.borderRadius}px;
        border-width: ${({ theme }) =>
            theme.components.Input?.Global?.borderWidth ??
            theme.components.Global.borderWidth}px;
        border-color: ${({ theme, $readOnly, $active }) =>
            ($active ? theme.components.Input?.activeBorderColor : undefined) ??
            ($readOnly
                ? (theme.components.Input?.Global?.colorBorderDisabled ??
                  theme.components.Global.colorBorderDisabled)
                : (theme.components.Input?.Global?.colorBorder ??
                  theme.components.Global.colorBorder))};
        padding-block: ${({ theme }) => theme.components.Input?.paddingBlock}px;
        padding-inline: ${({ theme }) =>
            theme.components.Input?.paddingInline}px;
        background-color: ${({ theme, $readOnly, $active }) =>
            ($active ? theme.components.Input?.activeBg : undefined) ??
            ($readOnly
                ? (theme.components.Input?.Global?.colorBgContainerDisabled ??
                  theme.components.Global.colorBgContainerDisabled)
                : (theme.components.Input?.Global?.colorBgContainer ??
                  theme.components.Global.colorBgContainer))};
    `,
    TextInput: styled(TextInput)<{ $readOnly?: boolean }>`
        flex: 1;
        font-size: ${({ theme }) =>
            theme.components.Input?.Global?.fontSize ??
            theme.components.Global.fontSize}px;
        color: ${({ theme, $readOnly }) =>
            $readOnly
                ? (theme.components.Input?.Global?.colorTextDisabled ??
                  theme.components.Global.colorTextDisabled)
                : (theme.components.Input?.Global?.colorText ??
                  theme.components.Global.colorText)};
    `,
    TextInputAddon: styled(View)<{ $readOnly?: boolean }>`
        align-items: center;
        justify-content: center;
        margin-top: -${({ theme }) => theme.components.Input?.paddingBlock}px;
        margin-bottom: -${({ theme }) => theme.components.Input?.paddingBlock}px;
        margin-right: -${({ theme }) => theme.components.Input?.paddingInline}px;
        padding-block: ${({ theme }) => theme.components.Input?.paddingBlock}px;
        padding-inline: ${({ theme }) =>
            theme.components.Input?.paddingInline}px;
        background-color: ${({ theme, $readOnly }) =>
            $readOnly
                ? (theme.components.Input?.Global?.colorBgContainerDisabled ??
                  theme.components.Global?.colorBgContainerDisabled)
                : (theme.components.Input?.addonBg ??
                  theme.components.Input?.Global?.colorBgContainer ??
                  theme.components.Global.colorBgContainer)};
        border-top-right-radius: ${({ theme }) =>
            theme.components.Input?.Global?.borderRadius ??
            theme.components.Global.borderRadius}px;
        border-bottom-right-radius: ${({ theme }) =>
            theme.components.Input?.Global?.borderRadius ??
            theme.components.Global.borderRadius}px;
    `,
    TextInputAddonText: styled(Text)<{ $readOnly?: boolean }>`
        font-size: ${({ theme }) =>
            theme.components.Input?.Global?.fontSize ??
            theme.components.Global.fontSize}px;
        color: ${({ theme, $readOnly }) =>
            $readOnly
                ? (theme.components.Input?.Global?.colorTextDisabled ??
                  theme.components.Global.colorTextDisabled)
                : (theme.components.Input?.Global?.colorText ??
                  theme.components.Global.colorText)};
    `,
    InlineChoiceWrapper: styled.TouchableOpacity<{
        $readOnly?: boolean;
        $active?: boolean;
    }>`
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: ${({ theme }) => theme.components.InlineChoice?.gap}px;
        border-radius: ${({ theme }) =>
            theme.components.InlineChoice?.Global?.borderRadius ??
            theme.components.Global.borderRadius}px;
        border-width: ${({ theme }) => theme.components.Global.borderWidth}px;
        border-color: ${({ theme, $readOnly, $active }) =>
            ($active
                ? theme.components.InlineChoice?.selectedBorderColor
                : undefined) ??
            ($readOnly
                ? theme.components.Global.colorBorderDisabled
                : (theme.components.InlineChoice?.Global?.colorBorder ??
                  theme.components.Global.colorBorder))};
        padding-block: ${({ theme }) =>
            theme.components.InlineChoice?.paddingBlock}px;
        padding-inline: ${({ theme }) =>
            theme.components.InlineChoice?.paddingInline}px;
        background-color: ${({ theme, $readOnly, $active }) =>
            ($active ? theme.components.InlineChoice?.selectedBg : undefined) ??
            ($readOnly
                ? theme.components.Global.colorBgContainerDisabled
                : theme.components.Global.colorBgContainer)};
    `,
    InlineChoiceCheckMark: styled(View)<{
        $readOnly?: boolean;
        $active?: boolean;
        $radio?: boolean;
    }>`
        align-items: center;
        justify-content: center;
        height: 16px;
        width: 16px;
        border-radius: ${({ $radio }) => ($radio ? 8 : 4)}px;
        border-width: 1px;
        border-color: ${({ theme, $readOnly, $active }) =>
            ($active
                ? theme.components.InlineChoice?.selectedBorderColor
                : undefined) ??
            ($readOnly
                ? theme.components.Global.colorBorderDisabled
                : (theme.components.InlineChoice?.Global?.colorBorder ??
                  theme.components.Global.colorBorder))};
        background-color: ${({ theme, $readOnly, $active, $radio }) =>
            ($active && $radio
                ? theme.components.InlineChoice?.selectedBorderColor
                : undefined) ??
            ($readOnly
                ? theme.components.Global.colorBgContainerDisabled
                : theme.components.Global.colorBgContainer)};
    `,
    InlineChoiceCheckMarkChecked: styled(View)<{
        $readOnly?: boolean;
        $active?: boolean;
        $radio?: boolean;
    }>`
        height: 8px;
        width: 8px;
        border-radius: ${({ $radio }) => ($radio ? 8 : 0)}px;
        border-width: 1px;
        border-color: ${({ theme, $readOnly, $active }) =>
            ($active
                ? theme.components.InlineChoice?.selectedBorderColor
                : undefined) ??
            ($readOnly
                ? theme.components.Global.colorBgContainerDisabled
                : theme.components.Global.colorBgContainer)};
        background-color: ${({ theme, $readOnly, $active, $radio }) =>
            ($active && !$radio
                ? theme.components.InlineChoice?.selectedBorderColor
                : undefined) ??
            ($readOnly
                ? theme.components.Global.colorBgContainerDisabled
                : theme.components.Global.colorBgContainer)};
    `,
    InlineChoiceOptionText: styled.Text`
        font-size: 16px;
    `,
    SelectInputWrapper: styled.TouchableOpacity<{
        $readOnly?: boolean;
        $active?: boolean;
    }>`
        flex-grow: 1;
        gap: 4px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    `,
    SelectInput: styled.View``,
    SelectInputMultipleOptionsWrapper: styled.View`
        flex-direction: row;
        gap: 4px;
    `,
    SelectInputMultipleOptionsItem: styled.View`
        flex-direction: row;
        gap: 8px;
        align-items: center;
        padding: 6px 8px;
        border-radius: 6px;
        background-color: #f0f0f0;
    `,
    SelectInputText: styled.Text`
        font-size: 16px;
        color: #333;
    `,
    SelectInputDropdownIcon: styled.View`
        width: 0;
        height: 0;
        background-color: transparent;
        border-style: solid;
        border-left-width: 6px;
        border-right-width: 6px;
        border-top-width: 6px;
        border-left-color: transparent;
        border-right-color: transparent;
        border-top-color: #333;
    `,
    SelectModalWrapper: styled.View`
        flex: 1;
    `,
    SelectModalHeaderWrapper: styled.View`
        display: flex;
        padding: 11px 16px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        border-bottom-width: 1px;
        border-bottom-color: #f0f0f0;
    `,
    SelectModalHeaderTitleText: styled.Text`
        font-size: 16px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.85);
        line-height: 24px;
    `,
    SelectModalHeaderCloseButton: styled.TouchableOpacity`
        width: 34px;
        height: 34px;
        justify-content: center;
        align-items: center;
    `,
    SelectModalContentWrapper: styled.View`
        flex: 1;
        width: 100%;
        background-color: white;
        border-radius: 10px;
        padding: 20px;
    `,
    SelectModalSearchInputWrapper: styled.View`
        margin-bottom: 10px;
        border-bottom-width: 1px;
        border-bottom-color: #eee;
    `,
    SelectModalSearchInput: styled.TextInput`
        padding: 10px;
        font-size: 16px;
    `,
    SelectModalContentItem: styled.TouchableOpacity`
        padding: 15px 10px;
        border-bottom-width: 1px;
        border-bottom-color: #eee;
    `,
    SelectModalContentItemText: styled.Text`
        font-size: 16px;
        color: #333;
    `,
    SelectModalFooterCloseButton: styled.TouchableOpacity`
        margin-top: 10px;
        padding: 10px;
        background-color: #f0f0f0;
        border-radius: 5px;
        align-items: center;
    `,
    SelectModalFooterCloseButtonText: styled.Text`
        font-size: 16px;
        color: #333;
    `,
};

export const styles = StyleSheet.create({
    container: {
        margin: 8,
        gap: 8,
        position: 'relative',
    },
    text: {
        fontSize: 16,
        fontWeight: 600,
    },
    textContainer: {
        gap: 8,
    },
    inputText: {
        fontSize: 16,
        width: '100%',
    },
    inputContainer: {
        borderRadius: 16,
        width: '100%',
        backgroundColor: 'white',
        padding: 16,
    },
    addButtonContainer: {
        padding: 16,
        backgroundColor: '#3366ff',
        alignSelf: 'center',
        width: 200,
        borderRadius: 16,
    },
    addButtonText: {
        fontSize: 16,
        fontWeight: 600,
        color: 'white',
        textAlign: 'center',
    },

    // choice
    selectOptionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 16,
        gap: 8,
    },
    selectBackground: {
        width: 12,
        height: 12,
        borderRadius: 12,
        borderWidth: 1,
    },
    isSelectedBackground: {
        backgroundColor: 'black',
    },
    selectText: {
        fontSize: 16,
        width: '100%',
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        margin: 4,
    },
    chipText: {
        marginRight: 6,
    },
    chipClose: {
        paddingHorizontal: 4,
    },
    repeatsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
});
