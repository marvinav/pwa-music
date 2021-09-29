import React from 'react';
import ReactDOM from 'react-dom';
import { HandShake, IBaseManifest, StorageProviderPlugin, View } from '../../shared/BasePlugin';
import { IFile, StorageEntry, StorageProvider } from '../../shared/interfaces/StorageProvider';
import { Settings } from './views/Settings';
import { OAuthTokenHandler } from './views/OAuthTokenHandler';

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
        console.log('YandexDiskPlugin constructed');
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
    provider = (settings: YandexStorageProviderSettings): YandexStorageProvider => {
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
class YandexStorageProvider implements StorageProvider<YandexStorageProviderSettings> {
    readonly settings: YandexStorageProviderSettings;

    constructor(settings: YandexStorageProviderSettings) {
        this.settings = settings;
    }

    getFiles(_path: string, _offset: number, _limit: number): Promise<StorageEntry> {
        throw new Error('Method not implemented.');
    }

    downloadFile(_file: IFile): File | Blob {
        throw new Error('Method not implemented.');
    }
}
