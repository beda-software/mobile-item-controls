import { StyleSheet, TextInput } from 'react-native';
import styled from 'styled-components/native';

export const S = {
    Container: styled.View`
        margin: 8px;
        gap: 8px;
        position: relative;
    `,
    InputWrapper: styled.TouchableOpacity<{
        $readOnly?: boolean;
        $active?: boolean;
    }>`
        border-radius: ${({ theme }) => theme.components.Global.borderRadius}px;
        border-width: ${({ theme }) => theme.components.Global.borderWidth}px;
        border-color: ${({ theme, $readOnly, $active }) =>
            ($active ? theme.components.Input.activeBorderColor : undefined) ??
            ($readOnly
                ? theme.components.Global.colorBorderDisabled
                : theme.components.Global.colorBorder)};
        padding-block: ${({ theme }) => theme.components.Input.paddingBlock}px;
        padding-inline: ${({ theme }) =>
            theme.components.Input.paddingInline}px;
        background-color: ${({ theme, $readOnly, $active }) =>
            ($active ? theme.components.Input.activeBg : undefined) ??
            ($readOnly
                ? theme.components.Global.colorBgContainerDisabled
                : theme.components.Global.colorBgContainer)};
    `,
    TextInput: styled(TextInput)<{ $readOnly?: boolean }>`
        font-size: ${({ theme }) =>
            theme.components.Input.fontSize ??
            theme.components.Global.fontSize}px;
        color: ${({ theme, $readOnly }) =>
            $readOnly
                ? theme.components.Global.colorTextDisabled
                : theme.components.Global.colorText};
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
