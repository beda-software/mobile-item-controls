import React, { useCallback, useRef, useState } from 'react';

import { Attachment } from 'fhir/r4b';
import { Dimensions, Platform, View } from 'react-native';

import { NativeSourceOverlay, SourceBox } from './SourceBox';
import { S } from './styles';
import { AnchorPosition, FileSource, UploadFileService } from './types';
import { useAttachFile } from './useAttachFile';

// Estimated height of the three-option source box (3 x 44px rows + margin);
// used only to decide whether there is room to drop below the trigger.
const ESTIMATED_SOURCE_BOX_HEIGHT = 140;

interface RenderButtonArgs {
    onPress: () => void;
    isUploading: boolean;
    disabled: boolean;
}

interface AttachFileTriggerProps {
    service: UploadFileService;
    onAttachment: (attachment: Attachment) => void;
    disabled?: boolean;
    // 'inline' (default): in-tree absolute popover; safe inside another modal.
    // 'native': popover in a transparent RN Modal with reliable tap-to-close;
    // use only where NOT nested in a modal.
    overlay?: 'inline' | 'native';
    renderButton: (args: RenderButtonArgs) => React.ReactNode;
}

// Renders a caller-supplied trigger button anchoring the three-option popover.
// On pick it uploads the file through `service` and hands the resulting FHIR
// Attachment back via `onAttachment`.
export function AttachFileTrigger({
    service,
    onAttachment,
    disabled = false,
    overlay = 'inline',
    renderButton,
}: AttachFileTriggerProps) {
    const { pickFromSource, isUploading } = useAttachFile(service);
    const [sourceBoxVisible, setSourceBoxVisible] = useState(false);
    const [placement, setPlacement] = useState<'below' | 'above'>('below');
    const [anchor, setAnchor] = useState<AnchorPosition | null>(null);
    // In native/iOS mode the pick is deferred until the overlay Modal has fully
    // dismissed (see handleOverlayDismiss) — presenting a picker mid-dismiss fails.
    const [pendingSource, setPendingSource] = useState<FileSource | null>(null);
    const anchorRef = useRef<View>(null);

    const closeSourceBox = useCallback(() => setSourceBoxVisible(false), []);

    const runPick = useCallback(
        async (source: FileSource) => {
            const attachment = await pickFromSource(source);
            if (attachment) {
                onAttachment(attachment);
            }
        },
        [pickFromSource, onAttachment],
    );

    // Measure the trigger in the window on open: decide above/below placement and
    // capture anchor coords (the native overlay positions itself from them).
    const handleToggle = useCallback(() => {
        if (disabled) {
            return;
        }
        if (sourceBoxVisible) {
            setSourceBoxVisible(false);
            return;
        }
        const node = anchorRef.current;
        if (!node) {
            setSourceBoxVisible(true);
            return;
        }
        node.measureInWindow((x, y, width, height) => {
            const spaceBelow = Dimensions.get('window').height - (y + height);
            setPlacement(spaceBelow < ESTIMATED_SOURCE_BOX_HEIGHT ? 'above' : 'below');
            setAnchor({ x, y, width, height });
            setSourceBoxVisible(true);
        });
    }, [disabled, sourceBoxVisible]);

    const handleSelect = useCallback(
        (source: FileSource) => {
            setSourceBoxVisible(false);
            // The iOS native overlay is an RN Modal; presenting a picker before it
            // finishes dismissing races the dismissal and silently fails (the
            // document picker especially, since — unlike the image picker — it has
            // no permission round-trip to delay it). Defer to the Modal's onDismiss.
            // Inline mode and Android have no such conflict, so pick right away.
            if (overlay === 'native' && Platform.OS === 'ios') {
                setPendingSource(source);
            } else {
                runPick(source);
            }
        },
        [overlay, runPick],
    );

    const handleOverlayDismiss = useCallback(() => {
        if (pendingSource) {
            const source = pendingSource;
            setPendingSource(null);
            runPick(source);
        }
    }, [pendingSource, runPick]);

    return (
        <View ref={anchorRef} collapsable={false}>
            <S.ButtonAnchor>
                {renderButton({ onPress: handleToggle, isUploading, disabled })}
                {overlay === 'inline' && sourceBoxVisible ? (
                    <SourceBox placement={placement} onSelect={handleSelect} onClose={closeSourceBox} />
                ) : null}
            </S.ButtonAnchor>
            {overlay === 'native' ? (
                <NativeSourceOverlay
                    visible={sourceBoxVisible}
                    anchor={anchor}
                    placement={placement}
                    onSelect={handleSelect}
                    onClose={closeSourceBox}
                    onDismiss={handleOverlayDismiss}
                />
            ) : null}
        </View>
    );
}
