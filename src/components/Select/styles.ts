import styled from 'styled-components/native';

export const S = {
    SelectContainer: styled.TouchableOpacity`
        border-width: 1px;
        border-color: #ccc;
        border-radius: 4px;
        padding: 12px 16px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    `,

    SelectField: styled.View``,
    MultiOptions: styled.View`
        flex-direction: row;
        gap: 4px;
    `,
    MultiOption: styled.View`
        flex-direction: row;
        gap: 8px;
        align-items: center;
        padding: 6px 8px;
        border-radius: 6px;
        background-color: #f0f0f0;
    `,

    SelectText: styled.Text`
        font-size: 16px;
        color: #333;
    `,

    SelectIcon: styled.View`
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

    ModalContainer: styled.View`
        flex: 1;
        /* background-color: rgba(0, 0, 0, 0.5); */
    `,

    ModalHeader: styled.View`
        display: flex;
        padding: 11px 16px;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        border-bottom-width: 1px;
        border-bottom-color: #f0f0f0;
    `,

    ModalHeaderTitle: styled.Text`
        font-size: 16px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.85);
        line-height: 24px;
    `,

    CloseButton: styled.TouchableOpacity`
        width: 34px;
        height: 34px;
        justify-content: center;
        align-items: center;
    `,

    ModalContent: styled.View`
        flex: 1;
        width: 100%;
        background-color: white;
        border-radius: 10px;
        padding: 20px;
    `,

    SearchContainer: styled.View`
        margin-bottom: 10px;
        border-bottom-width: 1px;
        border-bottom-color: #eee;
    `,

    SearchInput: styled.TextInput`
        padding: 10px;
        font-size: 16px;
    `,

    OptionItem: styled.TouchableOpacity`
        padding: 15px 10px;
        border-bottom-width: 1px;
        border-bottom-color: #eee;
    `,

    OptionText: styled.Text`
        font-size: 16px;
        color: #333;
    `,

    CloseButton2: styled.TouchableOpacity`
        margin-top: 10px;
        padding: 10px;
        background-color: #f0f0f0;
        border-radius: 5px;
        align-items: center;
    `,

    CloseButton2Text: styled.Text`
        font-size: 16px;
        color: #333;
    `,
};
