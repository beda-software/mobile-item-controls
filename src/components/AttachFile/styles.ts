import { BlurView } from 'expo-blur';
import { SymbolView } from 'expo-symbols';
import styled, { css } from 'styled-components/native';

export const S = {
    // Anchors the absolutely-positioned source box directly below the trigger.
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
    // Full-screen tap-to-close layer for the native (RN Modal) overlay variant.
    // A real screen-spanning Pressable, so taps anywhere outside the popover
    // register — unlike the in-tree Backdrop, whose touches are clipped to the
    // anchor's bounds.
    NativeOverlay: styled.Pressable`
        flex: 1;
    `,
    // Absolutely positioned at measured anchor coords (left/top via inline style);
    // carries the drop shadow while SourceBoxContent clips the blurred surface.
    NativePopover: styled.View`
        position: absolute;
        width: 250px;
        border-radius: 12px;
        elevation: 8;
        shadow-color: rgba(0, 0, 0, 0.2);
        shadow-opacity: 1;
        shadow-radius: 16px;
        shadow-offset: 0px 0px;
    `,
};
