import React from 'react';

import { Modal, Pressable } from 'react-native';

import { S } from './styles';
import { AnchorPosition, FileSource } from './types';

// Estimated popover height (3 x 44px rows + margin); used to offset the native
// overlay upward when it opens above the anchor.
const ESTIMATED_SOURCE_BOX_HEIGHT = 140;
const POPOVER_WIDTH = 250;
const GAP_FROM_ANCHOR = 6;
const EDGE_MARGIN = 8;

// The three-option (Photo / Camera / Files) blurred surface, shared by the
// inline and native overlay variants.
function SourceOptions({ onSelect }: { onSelect: (source: FileSource) => void }) {
    return (
        <S.SourceBoxContent>
            <S.SourceOption onPress={() => onSelect('library')} activeOpacity={0.8}>
                <S.SourceOptionText>Photo</S.SourceOptionText>
                <S.OptionSymbol name="photo.on.rectangle" />
            </S.SourceOption>
            <S.SourceOption onPress={() => onSelect('camera')} activeOpacity={0.8}>
                <S.SourceOptionText>Camera</S.SourceOptionText>
                <S.OptionSymbol name="camera" />
            </S.SourceOption>
            <S.SourceOption $last onPress={() => onSelect('document')} activeOpacity={0.8}>
                <S.SourceOptionText>Files</S.SourceOptionText>
                <S.OptionSymbol name="text.document" />
            </S.SourceOption>
        </S.SourceBoxContent>
    );
}

interface SourceBoxProps {
    placement: 'below' | 'above';
    onSelect: (source: FileSource) => void;
    onClose: () => void;
}

// Inline variant: absolutely positioned relative to the anchor, backed by a
// full-area transparent Backdrop instead of an RN Modal, so it also works when
// rendered inside a modal (nested RN Modals crash on iPad).
export function SourceBox({ placement, onSelect, onClose }: SourceBoxProps) {
    return (
        <>
            <S.Backdrop activeOpacity={1} onPress={onClose} />
            <S.SourceBox $placement={placement}>
                <SourceOptions onSelect={onSelect} />
            </S.SourceBox>
        </>
    );
}

interface NativeSourceOverlayProps {
    visible: boolean;
    anchor: AnchorPosition | null;
    placement: 'below' | 'above';
    onSelect: (source: FileSource) => void;
    onClose: () => void;
    // Fired (iOS) after the Modal has fully dismissed — the only point at which
    // the presenter is free, so a picker can be launched without racing dismissal.
    onDismiss?: () => void;
}

// Native variant: renders the popover in a transparent RN Modal positioned at
// the measured anchor, with a screen-spanning Overlay for reliable tap-to-close.
// Use only where NOT nested inside another modal (e.g. the visit sidebar).
//
// The Modal is kept mounted (toggled via `visible`, never unmounted) so its
// onDismiss callback is actually delivered — RN routes onDismiss to the still-
// mounted component, so returning null on close would drop it.
export function NativeSourceOverlay({
    visible,
    anchor,
    placement,
    onSelect,
    onClose,
    onDismiss,
}: NativeSourceOverlayProps) {
    let left = 0;
    let top = 0;
    if (anchor) {
        // Right-align the popover to the anchor, clamped to the screen edge.
        left = Math.max(EDGE_MARGIN, anchor.x + anchor.width - POPOVER_WIDTH);
        top =
            placement === 'above'
                ? anchor.y - ESTIMATED_SOURCE_BOX_HEIGHT - GAP_FROM_ANCHOR
                : anchor.y + anchor.height + GAP_FROM_ANCHOR;
    }

    return (
        <Modal transparent visible={visible} animationType="fade" onRequestClose={onClose} onDismiss={onDismiss}>
            {visible && anchor ? (
                <S.NativeOverlay onPress={onClose}>
                    <S.NativePopover style={{ left, top }}>
                        {/* Swallow taps inside the popover so they don't reach the overlay. */}
                        <Pressable onPress={() => undefined}>
                            <SourceOptions onSelect={onSelect} />
                        </Pressable>
                    </S.NativePopover>
                </S.NativeOverlay>
            ) : null}
        </Modal>
    );
}
