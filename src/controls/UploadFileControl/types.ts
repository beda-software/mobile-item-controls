export interface PickedFile {
    uri: string;
    name: string;
    mimeType?: string;
}

export interface UploadFileService {
    uploadFile: (file: PickedFile, onProgress?: (percent: number) => void) => Promise<string>;
}
