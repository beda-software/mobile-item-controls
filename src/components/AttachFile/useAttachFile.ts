import { useCallback, useState } from 'react';

import { Attachment } from 'fhir/r4b';
import { Alert } from 'react-native';

import { pickFile } from './pickFile';
import { FileSource, PickedFile, UploadFileService } from './types';

// Picks a file from the chosen source, uploads it through the injected service,
// and returns the result as a FHIR R4B Attachment (url = the storage key).
export function useAttachFile(service: UploadFileService) {
    const [isUploading, setIsUploading] = useState(false);

    const uploadPicked = useCallback(
        async (file: PickedFile): Promise<Attachment | undefined> => {
            setIsUploading(true);
            try {
                const key = await service.uploadFile(file);
                return {
                    url: key,
                    title: file.name,
                    contentType: file.mimeType,
                };
            } catch (error) {
                Alert.alert('Upload failed', error instanceof Error ? error.message : 'Could not upload the file.');
                return undefined;
            } finally {
                setIsUploading(false);
            }
        },
        [service],
    );

    const pickFromSource = useCallback(
        async (source: FileSource): Promise<Attachment | undefined> => {
            try {
                const file = await pickFile(source);
                if (!file) {
                    return undefined;
                }
                return await uploadPicked(file);
            } catch (error) {
                Alert.alert('Error', error instanceof Error ? error.message : 'Could not pick the file.');
                return undefined;
            }
        },
        [uploadPicked],
    );

    return { pickFromSource, isUploading };
}
