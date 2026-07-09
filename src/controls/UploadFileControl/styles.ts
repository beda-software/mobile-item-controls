import { BlurView } from 'expo-blur';
import { SymbolView } from 'expo-symbols';
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
    // Anchors the absolutely-positioned source box directly below the button.
    ButtonAnchor: styled.View`
        position: relative;
        z-index: 10;
    `,
    // Full-area transparent layer that closes the box on an outside tap.
    // Oversized negative insets so it covers the surrounding form without an RN Modal.
    Backdrop: styled.TouchableOpacity`
        position: absolute;
        top: -2000px;
        left: -2000px;
        width: 4000px;
        height: 4000px;
        z-index: 15;
    `,
    // Shadow wrapper: carries the drop shadow and placement, no clipping so the
    // shadow renders. The blurred surface is clipped by SourceBoxContent inside.
    SourceBox: styled.View<{ $placement?: 'below' | 'above' }>`
        position: absolute;
        right: 0;
        width: 250px;
        border-radius: 12px;
        z-index: 20;
        elevation: 8;
        shadow-color: rgba(0, 0, 0, 0.2);
        shadow-opacity: 1;
        shadow-radius: 16px;
        shadow-offset: 0px 0px;

        ${({ $placement }) =>
            $placement === 'above'
                ? css`
                      bottom: 100%;
                      margin-bottom: 6px;
                  `
                : css`
                      top: 100%;
                      margin-top: 6px;
                  `}
    `,
    // iOS "Material Blur" (systemThickMaterialLight ≈ 25px radius). The exact
    // color-dodge blend in the design can't be reproduced in RN; the native
    // material tint is the faithful equivalent. Background tint is a fallback
    // for platforms without native blur (web/Android).
    SourceBoxContent: styled(BlurView).attrs(() => ({
        intensity: 50,
        tint: 'systemThickMaterialLight',
    }))`
        border-radius: 12px;
        overflow: hidden;
        background-color: rgba(255, 255, 255, 0.6);
    `,
    SourceOption: styled.TouchableOpacity<{ $last?: boolean }>`
        height: 44px;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding-horizontal: 16px;
        border-bottom-width: ${({ $last }) => ($last ? '0px' : '0.5px')};
        border-bottom-color: rgba(128, 128, 128, 0.55);
    `,
    SourceOptionText: styled.Text`
        font-size: 17px;
        line-height: 22px;
        letter-spacing: -0.43px;
        color: #000;
    `,
    // Size by a uniform square frame with aspect-fit rather than point size, so
    // symbols with differing intrinsic metrics (e.g. the tall text.document vs
    // the wide photo.on.rectangle) render at a visually consistent size.
    OptionSymbol: styled(SymbolView).attrs(() => ({
        tintColor: '#000',
        weight: 'regular',
        resizeMode: 'scaleAspectFit',
    }))`
        width: 22px;
        height: 22px;
    `,
};
