import { useState } from 'react';

import * as FileSystem from 'expo-file-system/legacy';
import * as Print from 'expo-print';
import { Share, Alert, Platform } from 'react-native';

interface ShareTarget {
    name?: string;
}

interface GenerateAndSharePdfParams extends ShareTarget {
    html: string;
}

interface DownloadAndSharePdfParams extends ShareTarget {
    url: string;
}

export function useSafeDocument() {
    const [isBusy, setIsBusy] = useState<boolean>(false);

    // Presenting the share sheet is a handoff to the OS — its promise does not
    // resolve reliably on iPad (popover dismissed by tapping outside), so it must
    // NOT gate `isBusy`. Errors are alerted but kept independent of the busy flag.
    const sharePdfUri = (fileUri: string): void => {
        Share.share({
            title: 'Save PDF',
            url: Platform.OS === 'ios' ? fileUri : `file://${fileUri}`, // On Android, prepend file:// protocol
        }).catch((error) => {
            Alert.alert(
                'Share Failed',
                `Could not share the PDF: ${error instanceof Error ? error.message : 'Unknown error'}`,
            );
        });
    };

    const generateAndSharePdf = async ({ html }: GenerateAndSharePdfParams): Promise<void> => {
        setIsBusy(true);

        let fileUri: string;
        try {
            ({ uri: fileUri } = await Print.printToFileAsync({ html }));
        } catch (error) {
            Alert.alert(
                'Export Failed',
                `Could not generate the PDF: ${error instanceof Error ? error.message : 'Unknown error'}`,
            );

            return;
        } finally {
            setIsBusy(false);
        }

        sharePdfUri(fileUri);
    };

    const downloadAndSharePdf = async ({ url, name }: DownloadAndSharePdfParams): Promise<void> => {
        setIsBusy(true);

        let fileUri: string;
        try {
            const fileName = name ? `${name}.pdf` : `Document_${Date.now()}.pdf`;
            fileUri = FileSystem.documentDirectory + fileName;

            const downloadResult = await FileSystem.downloadAsync(url, fileUri);

            if (downloadResult.status !== 200) {
                throw new Error('Failed to download file');
            }
        } catch (error) {
            Alert.alert(
                'Download Failed',
                `Could not download the PDF: ${error instanceof Error ? error.message : 'Unknown error'}`,
            );

            return;
        } finally {
            setIsBusy(false);
        }

        sharePdfUri(fileUri);
    };

    return { isBusy, generateAndSharePdf, downloadAndSharePdf };
}
