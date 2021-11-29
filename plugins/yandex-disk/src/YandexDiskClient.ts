import {
    Disk,
    ErrorRespone,
    FilesResourceList,
    LastUploadedResourceList,
    Link,
    MediaType,
    IResource,
} from './YandexDiskClient.types';

export class YandexDiskClient {
    private readonly token: string;
    constructor(token: string) {
        this.token = token;
    }

    private makeRequest(endpoint: string): {
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

    private mapResponse = async <T extends { _: 'error' | string }>(
        response: Promise<T | ErrorRespone>,
        type: T['_'],
    ): Promise<T | ErrorRespone> => {
        const result = await response;
        if ((result as ErrorRespone).error) {
            return {
                ...(result as ErrorRespone),
                _: 'error',
            };
        }
        return {
            ...(result as T),
            _: type,
        };
    };

    /**
     * The API returns general information about a user's Disk: the available space, system folder addresses, and so on.
     */
    getUserDisk = async (): Promise<ErrorRespone | Disk> => {
        const { url, headers } = this.makeRequest('');
        const response = await fetch(url, { headers });
        return this.mapResponse<Disk>(response.json(), 'disk');
    };

    /**
     * To request metainformation about files and folders, specify the path to the corresponding resource on Yandex.Disk. Metainformation includes the properties of files and folders, and the properties and contents of subfolders.
     * @param path The path to the desired resource is relative to the Yandex.Disk root directory. The path to a resource in the Trash should be relative to the Trash root directory. The path in the parameter value should be URL-encoded.
     */
    getMetainformation = async (
        path: string,
        options?: {
            fields?: (keyof IResource)[];
            limit: number;
            offset?: number;
            preview_crop?: boolean;
            preview_size?: string;
            sort?: 'name' | 'path' | 'created' | 'modified' | 'size';
            reverseSort?: boolean;
        },
    ): Promise<ErrorRespone | IResource> => {
        const { fields, limit, offset, preview_crop, preview_size, sort, reverseSort } = options ?? {};
        const { url, headers } = this.makeRequest('resources');
        const uri = new URL(url);
        uri.searchParams.set('path', path);
        uri.searchParams.set('limit', (limit ?? 20).toString());
        fields && uri.searchParams.set('fields', fields.join(','));
        offset && uri.searchParams.set('offset', offset.toString());
        uri.searchParams.set('sort', `${reverseSort ?? true ? '-' : ''}${sort ?? 'modified'}`);
        if (preview_crop) {
            uri.searchParams.set('preview_crop', `true`);
            preview_size && uri.searchParams.set('preview_size', preview_size);
        }
        const response = await fetch(uri.toString(), { headers });
        return this.mapResponse<IResource>(response.json(), 'resource');
    };

    /**
     * The API returns a flat list of all files on Yandex.Disk in alphabetical order. The flat list does not reflect the folder structure, so it is convenient to search for a particular file type spread across different folders.
     */
    getFlatList = async (
        query: {
            limit?: number;
            media_type?: MediaType[];
            offset?: number;
            fields?: (keyof IResource)[];
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
        return this.mapResponse<FilesResourceList>(response.json(), 'filesResourceList');
    };

    /**
     * You can filter the list by file type (audio, video, image, and so on). Yandex.Disk detects the type of each downloaded file.
     */
    getLatestUploaded = async (query: {
        limit: number;
        media_type: MediaType[];
        fields?: (keyof IResource)[];
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
        return this.mapResponse<LastUploadedResourceList>(response.json(), 'lastUploadedResourceList');
    };

    /**
     * You can set additional custom attributes for any writable file or folder. These attributes will be returned in response to all requests for resource metainformation (list of all files, last uploaded, and so on).
     */
    addMetaForAResource = async (
        path: string,
        custom_properties: Record<string, string>,
        fields: (keyof IResource)[],
    ): Promise<ErrorRespone | IResource> => {
        const { url, headers } = this.makeRequest('resources/');
        const uri = new URL(url);
        uri.searchParams.set('path', path);
        fields && uri.searchParams.set('fields', fields.join(','));
        const response = await fetch(uri.toString(), {
            headers,
            method: 'PATCH',
            body: JSON.stringify({ custom_properties }),
        });
        return this.mapResponse<IResource>(response.json(), 'resource');
    };

    /**
     * When you have given the Yandex.Disk API the desired path to the uploaded file, you receive a URL for accessing the file uploader.
     */
    uploadUrlRequest = async (
        path: string,
        overwrite = false,
        fields?: (keyof IResource)[],
    ): Promise<ErrorRespone | Link> => {
        const { url, headers } = this.makeRequest('resources/upload');
        const uri = new URL(url);
        uri.searchParams.set('path', path);
        overwrite && uri.searchParams.set('overwrite', 'true');
        fields && uri.searchParams.set('fields', fields.join(','));
        const response = await fetch(uri.toString(), {
            headers,
        });
        return this.mapResponse<Link>(response.json(), 'link');
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
