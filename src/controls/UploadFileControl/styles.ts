import { ScrollView, TextInput } from 'react-native';
import styled from 'styled-components/native';

export const S = {
    FileList: styled.View`
        gap: 8px;
    `,
    FileRow: styled.View`
        flex-direction: row;
        align-items: center;
        gap: 12px;
        padding: 12px;
        border-radius: 12px;
        border-width: 1px;
        border-color: #f0f0f0;
        background-color: white;
    `,
    FileInfo: styled.View`
        flex: 1;
        gap: 2px;
    `,
    FileName: styled.Text`
        font-size: 15px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.88);
    `,
    FileDescription: styled.Text`
        font-size: 13px;
        color: rgba(0, 0, 0, 0.5);
    `,
    RemoveButton: styled.TouchableOpacity`
        padding: 4px;
    `,
    EmptyText: styled.Text`
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        padding-vertical: 8px;
    `,
    AttachButton: styled.TouchableOpacity`
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 14px;
        border-radius: 12px;
        background-color: rgba(0, 0, 0, 0.88);
    `,
    AttachButtonText: styled.Text`
        color: white;
        font-size: 15px;
        font-weight: 600;
    `,

    // Source selection sheet
    SheetOverlay: styled.TouchableOpacity`
        flex: 1;
        background-color: rgba(0, 0, 0, 0.35);
        justify-content: flex-end;
    `,
    SheetCard: styled.View`
        background-color: white;
        border-top-left-radius: 16px;
        border-top-right-radius: 16px;
        padding: 16px;
        padding-bottom: 32px;
        gap: 8px;
    `,
    SheetOption: styled.TouchableOpacity`
        flex-direction: row;
        align-items: center;
        gap: 12px;
        padding: 16px;
        border-radius: 12px;
        background-color: #f7f7f7;
    `,
    SheetOptionText: styled.Text`
        font-size: 16px;
        font-weight: 500;
        color: rgba(0, 0, 0, 0.88);
    `,

    // Add file details modal
    ModalOverlay: styled.View`
        flex: 1;
        background-color: rgba(0, 0, 0, 0.35);
        justify-content: center;
        padding: 20px;
    `,
    ModalCard: styled.View`
        background-color: white;
        border-radius: 16px;
        padding: 16px;
        gap: 12px;
        max-height: 80%;
    `,
    ModalHeader: styled.View`
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    `,
    ModalTitle: styled.Text`
        font-size: 17px;
        font-weight: 700;
        color: rgba(0, 0, 0, 0.88);
    `,
    CloseButton: styled.TouchableOpacity`
        padding: 4px;
    `,
    PendingListScroll: styled(ScrollView)`
        flex-grow: 0;
    `,
    PendingListInner: styled.View`
        gap: 12px;
    `,
    PendingCard: styled.View`
        border-width: 1px;
        border-color: #f0f0f0;
        border-radius: 12px;
        padding: 12px;
        gap: 8px;
    `,
    PendingHeader: styled.View`
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
    `,
    PendingName: styled.Text`
        flex: 1;
        font-size: 15px;
        font-weight: 600;
        color: rgba(0, 0, 0, 0.88);
    `,
    DescriptionInput: styled(TextInput)`
        border-width: 1px;
        border-color: #f0f0f0;
        border-radius: 8px;
        padding: 10px;
        font-size: 15px;
        min-height: 72px;
        color: rgba(0, 0, 0, 0.88);
    `,
    SecondaryButton: styled.TouchableOpacity`
        flex-direction: row;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px;
        border-radius: 12px;
        background-color: rgba(0, 0, 0, 0.88);
    `,
    SecondaryButtonText: styled.Text`
        color: white;
        font-size: 15px;
        font-weight: 600;
    `,
    ModalFooter: styled.View`
        flex-direction: row;
        justify-content: flex-end;
        align-items: center;
        gap: 12px;
    `,
    FooterButton: styled.TouchableOpacity<{ $primary?: boolean }>`
        padding-vertical: 10px;
        padding-horizontal: 16px;
        border-radius: 8px;
        background-color: ${({ $primary }) => ($primary ? 'rgba(0, 0, 0, 0.88)' : 'transparent')};
    `,
    FooterButtonText: styled.Text<{ $primary?: boolean }>`
        font-size: 15px;
        font-weight: 600;
        color: ${({ $primary }) => ($primary ? 'white' : 'rgba(0, 0, 0, 0.6)')};
    `,
};
