import styled, { css } from 'styled-components/native';

import { Icon } from '../../components/Icon';

export const S = {
    FileList: styled.View`
        gap: 8px;
        margin-bottom: 8px;
    `,
    FileRow: styled.View`
        flex-direction: row;
        align-items: center;
        gap: 12px;
        padding: 8px 16px;
        border-radius: 12px;
        border-width: 1px;
        border-color: rgba(22, 25, 28, 0.1);
        background-color: white;
    `,
    FilePreview: styled.View`
        width: 40px;
        height: 48px;
        align-items: center;
        justify-content: center;
        border-radius: 8px;
        background-color: rgba(22, 25, 28, 0.05);
    `,
    FileIcon: styled(Icon).attrs({
        fontSize: 24,
        fontWeight: 300,
    })`
        color: rgba(0, 0, 0, 0.5);
    `,
    FileName: styled.Text`
        flex: 1;
        font-size: 16px;
        font-weight: 700;
        color: rgba(0, 0, 0, 0.88);
    `,
    RemoveButton: styled.TouchableOpacity`
        width: 24px;
        height: 24px;
        align-items: center;
        justify-content: center;
    `,
    RemoveIcon: styled(Icon).attrs({
        fontSize: 24,
        fontWeight: 300,
    })`
        line-height: 26px;
        color: rgba(0, 0, 0, 0.88);
    `,
    // Constrains the loading spinner to the same 24px box the add icon occupies,
    // so swapping icon -> spinner keeps the button label from shifting.
    AddSpinnerBox: styled.View`
        width: 24px;
        height: 24px;
        align-items: center;
        justify-content: center;
    `,
    AddIcon: styled(Icon).attrs({
        fontSize: 24,
        fontWeight: 300,
    })<{ $disabled?: boolean }>`
        color: #fff;

        ${({ $disabled }) =>
            $disabled &&
            css`
                color: #adb5bd;
            `}
    `,
};
