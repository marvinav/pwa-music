import React from 'react';
import { StorageProviderPlugin, View } from '../shared/BasePlugin';
import { IFile, StorageEntry, StorageProvider } from '../shared/interfaces/StorageProvider';
import { TestDiv } from './App';

export default class YandexDiskPlugin implements StorageProviderPlugin<YandexStorageProviderSettings> {
    constructor() {
        console.log('YandexDiskPlugin constructed');
    }
    settings: Omit<View, 'scope'> & { scope: 'settings.main' } = {
        scope: 'settings.main',
        _: 'reactView',
        id: 'settings',
        render(): React.ReactElement {
            return <TestDiv></TestDiv>;
        },
    };
    provider = (settings: YandexStorageProviderSettings): YandexStorageProvider => {
        return new YandexStorageProvider(settings);
    };
    views?: View[] = [
        {
            _: 'reactView',
            id: 'oauth-token-handler',
            scope: 'route.main',
            render(): React.ReactElement {
                return <div>route handler</div>;
            },
        },
    ];
    manifest: { id: string; name: string; version: string; permissions?: ''; type: 'storage-provider' | 'view' } = {
        id: 'yandex-disk',
        name: 'Yandex Disk plugin',
        version: '0.0.1',
        permissions: '',
        type: 'storage-provider',
    };
}
interface YandexStorageProviderSettings {
    token: string;
    expiresDate: Date;
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
