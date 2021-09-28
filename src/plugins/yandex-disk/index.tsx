import React from 'react';
import { IBaseManifest, StorageProviderPlugin, View } from '../shared/BasePlugin';
import { IFile, StorageEntry, StorageProvider } from '../shared/interfaces/StorageProvider';
import { TestDiv } from './App';

const manifest: IBaseManifest = {
    id: 'yandex-disk',
    name: 'Yandex Disk plugin',
    version: '0.0.1',
    type: 'storage-provider',
    author: 'marvinav',
    description: 'Yandex Disk Storage Provider',
    entry: 'main.js',
    settings: { _: 'reactView', id: 'settings', scope: 'settings.main' },
    views: [{ _: 'reactView', id: 'ouath-token-handler', scope: 'route.main' }],
};

export default class YandexDiskPlugin implements StorageProviderPlugin<YandexStorageProviderSettings> {
    constructor() {
        console.log('YandexDiskPlugin constructed');
    }
    type: 'storage-provider';
    settings: typeof manifest['settings'] & View = {
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
            ...manifest[0],
            render(): React.ReactElement {
                return <div>route handler</div>;
            },
        },
    ];
    manifest = manifest;
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
