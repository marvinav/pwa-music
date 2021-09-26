export type StorageEntry = IFile | IDirectory;

export interface IFile {
    _: 'file';
    /**
     * Path of file
     */
    path: string;

    /**
     * Name of file
     */
    name: string;

    /**
     * File preview url or dataurl string
     */
    preview: string;

    mimeType: string;

    /**
     * The size of file in bytes
     */
    size: number;

    created: Date;

    modified: Date;
}

export interface IDirectory {
    _: 'directory';
    /**
     * Path of file
     */
    path: string;

    /**
     * Name of dir
     */
    name: string;

    /**
     * File preview url or dataurl string
     */
    preview: string;

    /**
     * The size of file in bytes
     */
    size: number;

    created: Date;

    modified: Date;
}

export abstract class StorageProvider<T> {
    readonly settings: T;

    constructor(settings: T) {
        this.settings = settings;
    }

    abstract getFiles(path: string, offset: number, limit: number): Promise<StorageEntry>;

    abstract downloadFile(file: IFile): File | Blob;
}
