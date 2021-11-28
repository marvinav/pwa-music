import { IFile, StorageEntry } from 'shared/files/types';

export abstract class StorageProvider {
    _: 'storageProvider';
    abstract getFiles(path: string): Promise<StorageEntry>;

    abstract downloadFile(file: IFile): File | Blob;
}
