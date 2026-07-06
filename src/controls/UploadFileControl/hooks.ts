import { useCallback, useMemo, useState } from 'react';

import { QuestionItemProps, useFieldController } from '@beda.software/fhir-questionnaire';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { FormAnswerItems } from 'sdc-qrf';

import { PickedFile, UploadFileService } from './types';

export type FileSource = 'camera' | 'library' | 'document';

export interface PendingFile {
    id: string;
    file: PickedFile;
    filename: string;
    description: string;
}

let pendingIdCounter = 0;
function nextPendingId() {
    pendingIdCounter += 1;
    return `pending-${Date.now()}-${pendingIdCounter}`;
}

export function useUploadFileControl(props: QuestionItemProps, service: UploadFileService) {
    const { parentPath, questionItem } = props;
    const { linkId, repeats } = questionItem;
    const { value, onChange, disabled } = useFieldController<FormAnswerItems[]>(
        [...parentPath, linkId],
        questionItem
    );

    const attachments = useMemo(() => value ?? [], [value]);

    const [sourceSheetVisible, setSourceSheetVisible] = useState(false);
    const [detailsModalVisible, setDetailsModalVisible] = useState(false);
    const [pendingFiles, setPendingFiles] = useState<PendingFile[]>([]);
    const [isUploading, setIsUploading] = useState(false);

    const openSourceSheet = useCallback(() => {
        if (disabled) {
            return;
        }
        setSourceSheetVisible(true);
    }, [disabled]);

    const closeSourceSheet = useCallback(() => setSourceSheetVisible(false), []);

    const addPendingFile = useCallback((file: PickedFile) => {
        setPendingFiles((prev) => [
            ...prev,
            { id: nextPendingId(), file, filename: file.name, description: '' },
        ]);
        setDetailsModalVisible(true);
    }, []);

    const pickFromSource = useCallback(
        async (source: FileSource) => {
            setSourceSheetVisible(false);
            try {
                if (source === 'camera') {
                    const permission = await ImagePicker.requestCameraPermissionsAsync();
                    if (!permission.granted) {
                        Alert.alert('Permission required', 'Camera access is needed to take a photo.');
                        return;
                    }
                    const result = await ImagePicker.launchCameraAsync({
                        mediaTypes: ['images'],
                        quality: 0.8,
                    });
                    const asset = result.canceled ? undefined : result.assets[0];
                    if (asset) {
                        addPendingFile({
                            uri: asset.uri,
                            name: asset.fileName ?? `photo_${Date.now()}.jpg`,
                            mimeType: asset.mimeType ?? 'image/jpeg',
                        });
                    }
                } else if (source === 'library') {
                    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
                    if (!permission.granted) {
                        Alert.alert(
                            'Permission required',
                            'Photo library access is needed to attach a photo.'
                        );
                        return;
                    }
                    const result = await ImagePicker.launchImageLibraryAsync({
                        mediaTypes: ['images'],
                        quality: 0.8,
                    });
                    const asset = result.canceled ? undefined : result.assets[0];
                    if (asset) {
                        addPendingFile({
                            uri: asset.uri,
                            name: asset.fileName ?? `image_${Date.now()}.jpg`,
                            mimeType: asset.mimeType ?? 'image/jpeg',
                        });
                    }
                } else {
                    const result = await DocumentPicker.getDocumentAsync({
                        type: '*/*',
                        copyToCacheDirectory: true,
                        multiple: false,
                    });
                    const asset = result.canceled ? undefined : result.assets[0];
                    if (asset) {
                        addPendingFile({
                            uri: asset.uri,
                            name: asset.name,
                            mimeType: asset.mimeType,
                        });
                    }
                }
            } catch (error) {
                Alert.alert('Error', error instanceof Error ? error.message : 'Could not pick the file.');
            }
        },
        [addPendingFile]
    );

    const updatePendingDescription = useCallback((id: string, description: string) => {
        setPendingFiles((prev) => prev.map((p) => (p.id === id ? { ...p, description } : p)));
    }, []);

    const removePendingFile = useCallback((id: string) => {
        setPendingFiles((prev) => {
            const next = prev.filter((p) => p.id !== id);
            if (next.length === 0) {
                setDetailsModalVisible(false);
            }
            return next;
        });
    }, []);

    const cancelDetails = useCallback(() => {
        setPendingFiles([]);
        setDetailsModalVisible(false);
    }, []);

    const confirmUpload = useCallback(async () => {
        if (pendingFiles.length === 0) {
            return;
        }
        setIsUploading(true);
        try {
            const uploaded: FormAnswerItems[] = [];
            for (const pending of pendingFiles) {
                const key = await service.uploadFile(pending.file);
                uploaded.push({
                    value: {
                        Attachment: {
                            url: key,
                            title: pending.description.trim() || pending.filename,
                        },
                    },
                });
            }
            onChange(repeats ? [...attachments, ...uploaded] : uploaded.slice(-1));
            setPendingFiles([]);
            setDetailsModalVisible(false);
        } catch (error) {
            Alert.alert(
                'Upload failed',
                error instanceof Error ? error.message : 'Could not upload the file(s).'
            );
        } finally {
            setIsUploading(false);
        }
    }, [pendingFiles, service, repeats, onChange, attachments]);

    const removeAttachment = useCallback(
        (index: number) => {
            onChange(attachments.filter((_, i) => i !== index));
        },
        [attachments, onChange]
    );

    return {
        attachments,
        disabled,
        sourceSheetVisible,
        detailsModalVisible,
        pendingFiles,
        isUploading,
        openSourceSheet,
        closeSourceSheet,
        pickFromSource,
        updatePendingDescription,
        removePendingFile,
        cancelDetails,
        confirmUpload,
        removeAttachment,
    };
}
