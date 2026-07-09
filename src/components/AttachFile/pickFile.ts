import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

import { FileSource, PickedFile } from './types';

// Picks a single photo/file from the given source, requesting the necessary
// permission first. Returns undefined if the user cancels or denies access.
export async function pickFile(source: FileSource): Promise<PickedFile | undefined> {
    if (source === 'camera') {
        const permission = await ImagePicker.requestCameraPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permission required', 'Camera access is needed to take a photo.');
            return undefined;
        }
        const result = await ImagePicker.launchCameraAsync({ mediaTypes: ['images'], quality: 0.8 });
        const asset = result.canceled ? undefined : result.assets[0];
        if (!asset) {
            return undefined;
        }
        return {
            uri: asset.uri,
            name: asset.fileName ?? `photo_${Date.now()}.jpg`,
            mimeType: asset.mimeType ?? 'image/jpeg',
        };
    }

    if (source === 'library') {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            Alert.alert('Permission required', 'Photo library access is needed to attach a photo.');
            return undefined;
        }
        const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 });
        const asset = result.canceled ? undefined : result.assets[0];
        if (!asset) {
            return undefined;
        }
        return {
            uri: asset.uri,
            name: asset.fileName ?? `image_${Date.now()}.jpg`,
            mimeType: asset.mimeType ?? 'image/jpeg',
        };
    }

    const result = await DocumentPicker.getDocumentAsync({
        type: '*/*',
        copyToCacheDirectory: true,
        multiple: false,
    });
    const asset = result.canceled ? undefined : result.assets[0];
    if (!asset) {
        return undefined;
    }
    return {
        uri: asset.uri,
        name: asset.name,
        mimeType: asset.mimeType,
    };
}
