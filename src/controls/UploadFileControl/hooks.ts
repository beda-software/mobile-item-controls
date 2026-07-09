import { useCallback, useMemo, useState } from 'react';

import {
    getFieldErrorMessage,
    QuestionItemProps,
    useFieldController,
} from '@beda.software/fhir-questionnaire';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';
import { FormAnswerItems } from 'sdc-qrf';

import { PickedFile, UploadFileService } from './types';

export type FileSource = 'camera' | 'library' | 'document';

export function useUploadFileControl(props: QuestionItemProps, service: UploadFileService) {
    const { parentPath, questionItem } = props;
    const { linkId, repeats } = questionItem;
    const field = useFieldController<FormAnswerItems[]>([...parentPath, linkId], questionItem);
    const { value, onChange, disabled, fieldState } = field;

    const error = getFieldErrorMessage(field, fieldState, questionItem.text);

    const attachments = useMemo(() => value ?? [], [value]);
    const hasAttachments = attachments.length > 0;
    const showButton = Boolean(repeats) || !hasAttachments;
    const buttonTitle = hasAttachments ? 'Add another file' : 'Add file';

    const [sourceBoxVisible, setSourceBoxVisible] = useState(false);
    const [isUploading, setIsUploading] = useState(false);

    const toggleSourceBox = useCallback(() => {
        if (disabled) {
            return;
        }
        setSourceBoxVisible((prev) => !prev);
    }, [disabled]);

    const closeSourceBox = useCallback(() => setSourceBoxVisible(false), []);

    const uploadPicked = useCallback(
        async (file: PickedFile) => {
            setIsUploading(true);
            try {
                const key = await service.uploadFile(file);
                const uploaded: FormAnswerItems = {
                    value: {
                        Attachment: {
                            url: key,
                            title: file.name,
                            contentType: file.mimeType,
                        },
                    },
                };
                onChange(repeats ? [...attachments, uploaded] : [uploaded]);
            } catch (error) {
                Alert.alert(
                    'Upload failed',
                    error instanceof Error ? error.message : 'Could not upload the file.'
                );
            } finally {
                setIsUploading(false);
            }
        },
        [service, repeats, attachments, onChange]
    );

    const pickFromSource = useCallback(
        async (source: FileSource) => {
            setSourceBoxVisible(false);
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
                        await uploadPicked({
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
                        await uploadPicked({
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
                        await uploadPicked({
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
        [uploadPicked]
    );

    const removeAttachment = useCallback(
        (index: number) => {
            onChange(attachments.filter((_, i) => i !== index));
        },
        [attachments, onChange]
    );

    return {
        attachments,
        disabled,
        error,
        showButton,
        buttonTitle,
        sourceBoxVisible,
        isUploading,
        toggleSourceBox,
        closeSourceBox,
        pickFromSource,
        removeAttachment,
    };
}
