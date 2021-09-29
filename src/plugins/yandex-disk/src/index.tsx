import React from 'react';
import { HandShake, IBaseManifest, StorageProviderPlugin, View } from '../../shared/BasePlugin';
import { IFile, StorageEntry, StorageProvider } from '../../shared/interfaces/StorageProvider';
import { parseHash } from './helpers/parseHash';
import { TestDiv } from './views/App';
import { YandexDiskClient } from './YandexDiskClient';

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

    private renderAuthHandler = () => {
        const url = document.location.hash;
        console.log({ parsed: parseHash(url) });
        this.handShake.settings.get().then((x) => {
            if (!x) {
                const parsed = parseHash(url);
                this.handShake.settings.addOrUpdate({
                    clientId: '27679647b5984078abdcfdacca641201',
                    deviceId: 'test-test',
                    deviceName: 'test-device',
                    expiresIn: new Date(parsed.expiresIn + new Date().getTime()),
                    token: parsed.token,
                    type: parsed.type,
                });
            }
        });
        const client = new YandexDiskClient('27679647b5984078abdcfdacca641201', 'test-test', 'test-device');
        return (
            <div>
                <a href={client.oauthRequestUrlToken} target="_blank" rel="noreferrer">
                    Auth
                </a>
            </div>
        );
    };

    views?: View[] = [
        {
            ...manifest.views[0],
            render: this.renderAuthHandler,
        },
    ];
    manifest = manifest;
}
interface YandexStorageProviderSettings {
    token: string;
    type: string;
    deviceId: string;
    deviceName: string;
    clientId: string;
    expiresIn: Date;
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
