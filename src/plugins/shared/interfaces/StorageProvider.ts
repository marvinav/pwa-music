import { IFile, StorageEntry } from '../models/fileSystem';

export abstract class StorageProvider {
    _: 'storageProvider';
    abstract getFiles(path: string): Promise<StorageEntry>;

    abstract downloadFile(file: IFile): File | Blob;
}
