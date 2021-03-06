export type StorageEntry = IFile | IDirectory;

export interface IFile {
    _: 'file';

    /**
     * Path of file withoot fileName
     */
    readonly path: string;

    /**
     * Name of file
     */
    name: string;

    /**
     * File preview url or dataurl string
     */
    preview: string;

    /**
     * Mime type of file
     */
    mimeType: string;

    /**
     * The size of file in bytes
     */
    size: number;

    /**
     * Creation date of file
     */
    created: number;

    /**
     * Last modification date of file
     */
    modified: number;

    /**
     * The hash of file
     */
    hash: string;

    /**
     * Id of blob in file storage
     */
    blobId?: string;
}

export interface IDirectory {
    _: 'directory';
    /**
     * Path of directory without current dir
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

    created: number;

    modified: number;
}
