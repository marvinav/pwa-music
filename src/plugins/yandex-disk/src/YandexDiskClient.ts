import {
    Disk,
    ErrorRespone,
    FilesResourceList,
    LastUploadedResourceList,
    Link,
    MediaType,
    Resource,
} from './YandexDiskClient.types';

export class YandexDiskClient {
    private readonly token: string;
    constructor(token: string) {
        this.token = token;
    }

    makeRequest(endpoint: string): {
        url: string;
        headers: { 'Content-Type': 'application/json'; Authorization: string };
    } {
        return {
            url: `https://cloud-api.yandex.net/v1/disk/${endpoint}`,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `OAuth ${this.token}`,
            },
        };
    }

    /**
     * The API returns general information about a user's Disk: the available space, system folder addresses, and so on.
     */
    getUserDisk = async (): Promise<ErrorRespone | Disk> => {
        const { url, headers } = this.makeRequest('');
        const response = await fetch(url, { headers });
        return response.json() as Promise<ErrorRespone | Disk>;
    };

    /**
     * To request metainformation about files and folders, specify the path to the corresponding resource on Yandex.Disk. Metainformation includes the properties of files and folders, and the properties and contents of subfolders.
     * @param path The path to the desired resource is relative to the Yandex.Disk root directory. The path to a resource in the Trash should be relative to the Trash root directory. The path in the parameter value should be URL-encoded.
     */
    getMetainformation = async (
        path: string,
        options: {
            fields?: (keyof Resource)[];
            limit: number;
            offset?: number;
            preview_crop?: boolean;
            preview_size?: string;
            sort?: 'name' | 'path' | 'created' | 'modified' | 'size';
            reverseSort?: boolean;
        } = {
            limit: 20,
        },
    ): Promise<ErrorRespone | Resource> => {
        const { url, headers } = this.makeRequest('resources');
        const uri = new URL(url);
        uri.searchParams.set('path', path);
        uri.searchParams.set('limit', options.limit.toString());
        options.fields && uri.searchParams.set('fields', options.fields.join(','));
        options.offset && uri.searchParams.set('offset', options.offset.toString());
        options.sort && uri.searchParams.set('sort', `${options.reverseSort ? '-' : ''}${options.sort}`);
        if (options.preview_crop) {
            uri.searchParams.set('preview_crop', `true`);
            options.preview_size && uri.searchParams.set('preview_size', options.preview_size);
        }
        const response = await fetch(uri.toString(), { headers });
        return response.json() as Promise<Resource | ErrorRespone>;
    };

    /**
     * The API returns a flat list of all files on Yandex.Disk in alphabetical order. The flat list does not reflect the folder structure, so it is convenient to search for a particular file type spread across different folders.
     */
    getFlatList = async (
        query: {
            limit?: number;
            media_type?: MediaType[];
            offset?: number;
            fields?: (keyof Resource)[];
            preview_size?: string;
            preview_crop?: boolean;
        } = {},
    ): Promise<ErrorRespone | FilesResourceList> => {
        const { url, headers } = this.makeRequest('resources/files');
        const uri = new URL(url);
        query.limit && uri.searchParams.set('limit', query.limit.toString());
        query.media_type?.length > 0 && uri.searchParams.set('media_type', query.media_type.join(','));
        query.offset && uri.searchParams.set('offset', query.offset.toString());
        query.fields?.length > 0 && uri.searchParams.set('fields', query.fields.join(','));
        query.preview_size && uri.searchParams.set('preview_size', query.preview_size);
        query.preview_crop && uri.searchParams.set('preview_crop', 'true');
        const response = await fetch(uri.toString(), { headers });
        return response.json() as Promise<ErrorRespone | FilesResourceList>;
    };

    /**
     * You can filter the list by file type (audio, video, image, and so on). Yandex.Disk detects the type of each downloaded file.
     */
    getLatestUploaded = async (query: {
        limit: number;
        media_type: MediaType[];
        fields?: (keyof Resource)[];
        preview_size?: string;
        preview_crop?: boolean;
    }): Promise<ErrorRespone | LastUploadedResourceList> => {
        const { url, headers } = this.makeRequest('resources/last-uploaded');
        const uri = new URL(url);
        query.limit && uri.searchParams.set('limit', query.limit.toString());
        query.media_type?.length > 0 && uri.searchParams.set('media_type', query.media_type.join(','));
        query.fields?.length > 0 && uri.searchParams.set('fields', query.fields.join(','));
        query.preview_size && uri.searchParams.set('preview_size', query.preview_size);
        query.preview_crop && uri.searchParams.set('preview_crop', 'true');
        const response = await fetch(uri.toString(), { headers });
        return response.json() as Promise<ErrorRespone | LastUploadedResourceList>;
    };

    /**
     * You can set additional custom attributes for any writable file or folder. These attributes will be returned in response to all requests for resource metainformation (list of all files, last uploaded, and so on).
     */
    addMetaForAResource = async (
        path: string,
        custom_properties: Record<string, string>,
        fields: (keyof Resource)[],
    ): Promise<ErrorRespone | Resource> => {
        const { url, headers } = this.makeRequest('resources/');
        const uri = new URL(url);
        uri.searchParams.set('path', path);
        fields && uri.searchParams.set('fields', fields.join(','));
        const response = await fetch(uri.toString(), {
            headers,
            method: 'PATCH',
            body: JSON.stringify({ custom_properties }),
        });
        return response.json() as Promise<ErrorRespone | Resource>;
    };

    /**
     * When you have given the Yandex.Disk API the desired path to the uploaded file, you receive a URL for accessing the file uploader.
     */
    uploadUrlRequest = async (
        path: string,
        overwrite = false,
        fields?: (keyof Resource)[],
    ): Promise<ErrorRespone | Link> => {
        const { url, headers } = this.makeRequest('resources/upload');
        const uri = new URL(url);
        uri.searchParams.set('path', path);
        overwrite && uri.searchParams.set('overwrite', 'true');
        fields && uri.searchParams.set('fields', fields.join(','));
        const response = await fetch(uri.toString(), {
            headers,
        });
        return response.json() as Promise<ErrorRespone | Link>;
    };

    uploadFile = async (link: Link, file: File): Promise<number> => {
        if (link.template === 'true') {
            throw new Error('Templated uploading file not implemented');
        }

        const response = await fetch(link.href, {
            headers: {
                'Content-Type': file.type,
                'Content-Length': file.size.toString(),
            },
            method: link.method,
            body: await file.arrayBuffer(),
        });
        return response.status;
    };
}
