import React from 'react';
import ReactDOM from 'react-dom';
import { OAuthTokenHandler } from './views/OAuthTokenHandler';
import { Settings } from './views/Settings';
import { YandexDiskClient } from './YandexDiskClient';
import { Resource } from './YandexDiskClient.types';
import { StorageProvider } from 'entities/plugins/interfaces/StorageProvider';
import { HandShake, IBaseManifest, StorageProviderPlugin, View } from 'entities/plugins/BasePlugin';
import { IFile, StorageEntry } from 'shared/files/types';

const manifest: IBaseManifest = {
    id: 'yandex-disk',
    name: 'Yandex Disk plugin',
    version: '0.0.1',
    type: 'storage-provider',
    author: 'marvinav',
    description: 'Yandex Disk Storage Provider',
    entry: 'main.js',
    settings: { _: 'reactView', id: 'settings', scope: 'settings.main' },
    views: [{ _: 'reactView', id: 'oauth-token-handler', scope: 'route.main' }],
};

export default class YandexDiskPlugin extends StorageProviderPlugin<YandexStorageProviderSettings> {
    constructor(handShake: HandShake<YandexStorageProviderSettings>) {
        super(handShake);
    }
    type: 'storage-provider';
    private render = (id: 'settings' | 'oauth-token-handler') => {
        switch (id) {
            case 'settings':
                return (container: Element) => {
                    ReactDOM.render(<Settings handshake={this.handShake} />, container);
                };
            case 'oauth-token-handler':
                return (container: Element) => {
                    ReactDOM.render(<OAuthTokenHandler handshake={this.handShake} />, container);
                };
            default:
                return;
        }
    };
    settings: typeof manifest['settings'] & View = {
        scope: 'settings.main',
        _: 'reactView',
        id: 'settings',
        render: this.render('settings'),
    };

    provider = async (): Promise<YandexStorageProvider> => {
        const settings = await this.handShake.settings.get();

        if (!settings || !settings.token || settings.expiresIn < new Date()) {
            return;
        }

        const client = new YandexDiskClient(settings.token);
        const res = await client.getMetainformation('/');
        if (res._ === 'resource') {
            const resource = new Resource(res, client);
            await resource.getAllEmbedded();
        }
        return new YandexStorageProvider(settings);
    };

    views?: View[] = [
        {
            ...manifest.views[0],
            render: this.render('oauth-token-handler'),
        },
    ];
    manifest = manifest;
}
export interface YandexStorageProviderSettings {
    token?: string;
    type?: string;
    deviceId?: string;
    deviceName?: string;
    clientId?: string;
    expiresIn?: Date;
}
class YandexStorageProvider implements StorageProvider {
    readonly _ = 'storageProvider';
    readonly settings: YandexStorageProviderSettings;
    readonly client: YandexDiskClient;

    constructor(settings: YandexStorageProviderSettings) {
        this.settings = settings;
        this.client = new YandexDiskClient(settings.token);
    }

    async getFiles(_path: string): Promise<StorageEntry> {
        const response = await this.client.getMetainformation(_path);
        if (response._ === 'error') {
            throw new Error(response.message);
        }
        if (response._embedded.items.length != response._embedded.limit) {
            //TODO: collect all nested
        }
        throw new Error('Method not implemented.');
    }

    downloadFile(_file: IFile): File | Blob {
        throw new Error('Method not implemented.');
    }
}
