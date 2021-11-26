import { StorageEntry } from '../../../shared/plugins/models/fileSystem';
import { YandexDiskClient } from './YandexDiskClient';

/**
 * An error can occur if the request was formed incorrectly, the specified resource doesn't exist on the server, the server is not working, and so on. All errors are returned with HTTP response codes.
 */
export interface ErrorRespone {
    _: 'error';
    message: string;
    description: string;
    error: string;
}

/**
 * The object contains the URL for requesting resource metadata.
 */
export interface Link {
    _: 'link';
    /**
     * URL. It may be a URL template; see the templated key.
     */
    href: string;
    /**
     * The HTTP method for requesting the URL from the href key.
     */
    method: string;
    /**
     * Indicates a URL template according to RFC 6570.
     */
    template: string;
}

/**
 * Resource description or metainformation about a file or folder. Included in the response to the request for metainformation.
 */
export interface IResource {
    _: 'resource';
    /**
     * Key of a published resource.
     * It is included in the response only if the specified file or folder is published.
     */
    public_key?: string;

    /**
     * Link to a published resource.
     * It is included in the response only if the specified file or folder is published.
     */
    public_url?: string;

    /**
     * The resources located in the folder (contains the ResourceList object).
     * It is included in the response only when folder metainformation is requested.
     */
    _embedded?: ResourceList;

    /**
     * Link to a small image (preview) for the file. It is included in the response only for files that support graphic formats.
     * The preview can only be requested using the OAuth token of a user who has access to the file itself.
     */
    preview: string;

    /**
     * Resource name.
     */
    name: string;

    /**
     * An object with all attributes set with the Adding metainformation for a resource request. Contains only keys in the name:value format (cannot contain objects or arrays).
     */
    custom_properties: Record<string, string>;

    /**
     * The date and time when the resource was created, in ISO 8601 format.
     */
    created: string;

    /**
     * 	The date and time when the resource was modified, in ISO 8601 format.
     */
    modified: string;

    /**
     * Full path to the resource on Yandex.Disk.
     * In metainformation for a published folder, paths are relative to the folder itself. For published files, the value of the key is always "/".
     * For a resource located in the Trash, this attribute may have a unique ID appended to it (for example, trash:/foo_1408546879). Use this ID to differentiate the resource from other deleted resources with the same name.
     */
    path: string;

    /**
     * Path to the resource before it was moved to the Trash.
     * Included in the response only for a request for metainformation about a resource in the Trash.
     */
    origin_path: string;

    /**
     * MD5 hash of the file.
     */
    md5: string;

    /**
     * Resource type
     */
    type: 'dir' | 'file';

    /**
     * The MIME type of the file.
     */
    mime_type: string;

    /**
     * File size.
     */
    size: number;
}

export class Resource implements IResource {
    _: 'resource';
    public_key?: string;
    public_url?: string;
    _embedded?: ResourceList;
    preview: string;
    name: string;
    custom_properties: Record<string, string>;
    md5: string;
    type: 'dir' | 'file';
    mime_type: string;
    size: number;
    created: string;
    modified: string;
    path: string;
    origin_path: string;

    private readonly client: YandexDiskClient;
    private _embeddedResources: Map<string, IResource>;
    constructor(res: IResource, client: YandexDiskClient) {
        Object.assign(this, res);
        this.client = client;
    }

    mapToFileSystem = (): StorageEntry => {
        if (this.type === 'dir') {
            return {
                _: 'directory',
                created: new Date(this.created).getTime(),
                modified: new Date(this.modified).getTime(),
                name: this.name,
                path: this.path,
                preview: this.preview,
                size: this.size,
            };
        }
        return {
            _: 'file',
            created: new Date(this.created).getTime(),
            modified: new Date(this.modified).getTime(),
            name: this.name,
            path: this.path,
            preview: this.preview,
            size: this.size,
            hash: this.md5,
            mimeType: this.mime_type,
        };
    };

    getAllEmbedded = async (offset?: number): Promise<IResource[]> => {
        if (this.type === 'file') {
            return null;
        }

        this._embeddedResources = this._embeddedResources ?? new Map(this._embedded?.items?.map((x) => [x.path, x]));
        if (this._embeddedResources?.size >= this._embedded?.total) {
            return Array.from(this._embeddedResources.values());
        }
        const response = await this.client.getMetainformation(this.path, {
            limit: this._embedded?.total ?? 20,
            offset: offset ?? this._embedded?.items?.length ?? 0,
            sort: 'modified',
            reverseSort: true,
        });
        if (response._ === 'error') {
            throw new Error(response.error);
        }
        if (!this._embedded) {
            this._embedded = response._embedded;
        }
        if (response._embedded.items.length === 0 && response._embedded.total > 0) {
            // Collect from start if response does not contain items but dir in reality has them
            await this.getAllEmbedded(offset + 20);
        }
        response._embedded.items.forEach((x) => {
            this._embeddedResources.set(x.path, x);
        });
        this._embedded.total = response._embedded.total;
        if (this._embeddedResources.size < this._embedded.total) {
            await this.getAllEmbedded();
        }
        return Array.from(this._embeddedResources.values());
    };
}

/**
 * The list of resources in the folder. Contains Resource objects and list properties.
 */
export interface ResourceList {
    _: 'resourceList';
    /**
     * The field used for sorting the list.
     */
    sort: string;

    /**
     * 	The key of a published folder that contains resources from this list.
     * It is included in the response only if metainformation about a public folder is requested.
     */
    public_key: string;

    /**
     * Array of resources (Resource) contained in the folder.
     * Regardless of the requested sorting, resources in the array are ordered by type: first all the subfolders are listed, then all the files.
     */
    items: IResource[];

    /**
     * The maximum number of items in the items array; set in the request.
     */
    limit: number;

    /**
     * How much to offset the beginning of the list from the first resource in the folder.
     */
    offset: number;

    /**
     * The path to the folder whose contents are described in this ResourceList object.
     * For a public folder, the value of the attribute is always "/".
     */
    path: string;

    /**
     * The total number of resources in the folder.
     */
    total: number;
}

/**
 * Flat list of all files on Yandex.Disk in alphabetical order.
 */
export interface FilesResourceList {
    _: 'filesResourceList';
    /**
     * Array of recently uploaded files ( Resource ).
     */
    items: IResource[];
    /**
     * The maximum number of items in the items array; set in the request.
     */
    limit: number;
    /**
     * How much to offset the beginning of the list from the first resource in the folder.
     */
    offset: number;
}

/**
 * A list of files recently added to Yandex.Disk, sorted by upload date (from later to earlier).
 */
export interface LastUploadedResourceList {
    _: 'lastUploadedResourceList';
    /**
     * Array of recently uploaded files ( Resource ).
     */
    items: IResource[];

    /**
     * The maximum number of items in the items array; set in the request.
     */
    limit: number;
}

/**
 * List of files published on Yandex.Disk.
 */
export interface PublicResourcesList {
    _: 'publicResourcesList';
    /**
     * Array of recently uploaded files ( Resource ).
     */
    items: IResource[];

    /**
     * The maximum number of items in the items array; set in the request.
     */
    limit: number;

    /**
     * Resource type
     */
    type: 'dir' | 'folder';

    /**
     * How much to offset the beginning of the list from the first resource in the folder.
     */
    offset: number;
}

/**
 * Data about free and used space on Yandex.Disk
 */
export interface Disk {
    _: 'disk';
    /**
     * The cumulative size of the files in the Trash, in bytes.
     */
    trash_size: number;

    /**
     * The total space available to the user on Yandex.Disk, in bytes.
     */
    total_space: number;

    /**
     * The cumulative size of the files already stored on Yandex.Disk, in bytes.
     */
    used_space: number;

    /**
     * Absolute addresses of Yandex.Disk system folders. Folder names depend on the user interface language that was in use when the user's personal Disk was created. For example, the Downloads folder is created for an English-speaking user, Загрузки for a Russian-speaking user, and so on.
     */
    system_folders: Record<string, string>;
}

/**
 * The status of the operation. Operations are launched when you copy, move, or delete non-empty folders. The URL for requesting status is returned in response to these types of requests.
 */
export interface Operation {
    _: 'operation';
    status: 'success' | 'failure' | 'in-progress';
}

export type MediaType =
    | 'audio'
    | 'backup'
    | 'book'
    | 'compressed'
    | 'data'
    | 'development'
    | 'diskimage'
    | 'document'
    | 'encoded'
    | 'executable'
    | 'flash'
    | 'font'
    | 'image'
    | 'settings'
    | 'spreadsheet'
    | 'text'
    | 'unknown'
    | 'video'
    | 'web';
