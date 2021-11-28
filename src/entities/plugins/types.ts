import { IFile, StorageEntry } from 'shared/files/types';

export abstract class StorageProvider {
    _: 'storageProvider';
    abstract getFiles(path: string): Promise<StorageEntry>;

    abstract downloadFile(file: IFile): File | Blob;
}

/**
 * Provide access for settings
 */
export abstract class PluginSettingsConnection<T> {
    readonly pluginId: string;
    constructor(pluginId: string) {
        this.pluginId = pluginId;
    }
    abstract get(): Promise<T>;
    abstract addOrUpdate(conf: T): Promise<boolean>;
    abstract delete(): Promise<boolean>;
}

export interface ExtensionDb {
    path: string;
    id: string;
    enabled: boolean;
}

export abstract class PluginConnection {
    abstract getExtensionById(id: string): Promise<ExtensionDb>;
    abstract updateExtension(db: ExtensionDb): Promise<boolean>;
    abstract deleteExtension(id: string): Promise<boolean>;
}

/**
 * Plugin contracts
 */
export type ViewScope = SettingsMainScope | 'home.widget' | 'route.main';

export type SettingsMainScope = 'settings.main';
export type HomeWidgetScope = 'home.widget';
export type RouteMainScope = 'route.main';

export type View = ReactView | LoadingView;

export type BaseView = {
    id: string;
    scope: ViewScope;
};

export interface ReactView extends BaseView {
    _: 'reactView';
    render: (container: Element) => void;
}

export type Permissions = '';

export type HandShake<T> = { settings: PluginSettingsConnection<T> };

export abstract class BasePlugin<T> {
    protected readonly handShake: HandShake<T>;

    constructor(handShake: HandShake<T>) {
        this.handShake = handShake;
    }
    manifest: Manifest;
    settings: Omit<View, 'scope'> & { scope: SettingsMainScope };
    views?: View[];
}

export interface Error {
    _: 'error';
    message?: string;
}

export abstract class StorageProviderPlugin<T> extends BasePlugin<T> {
    readonly _: 'storage-provider';
    provider: () => Promise<StorageProvider | Error>;
}

export abstract class ViewPlugin<T> extends BasePlugin<T> {
    type: 'view';
    views: View[];
}

export interface LoadingView extends BaseView {
    _: 'loading';
}

export type Plugin<T> = StorageProviderPlugin<T> | ViewPlugin<T>;

export type Manifest = IBaseManifest;

export interface IBaseManifest {
    id: string;
    name: string;
    author: string;
    description: string;
    src?: string;
    version: `${number}.${number}.${number}`;
    entry: string;
    type: 'view' | 'storage-provider';
    views?: Omit<View, 'render'>[];
    settings: Omit<View, 'scope' | 'render'> & { scope: SettingsMainScope };
}
