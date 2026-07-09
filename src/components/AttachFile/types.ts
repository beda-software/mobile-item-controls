export interface PickedFile {
    uri: string;
    name: string;
    mimeType?: string;
}

export interface UploadFileService {
    uploadFile: (file: PickedFile, onProgress?: (percent: number) => void) => Promise<string>;
}

export type FileSource = 'camera' | 'library' | 'document';

export interface AnchorPosition {
    x: number;
    y: number;
    width: number;
    height: number;
}
