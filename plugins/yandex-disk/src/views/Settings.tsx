import PropTypes from 'prop-types';
import React from 'react';

import { HandShake } from 'entities/plugins/types';
import { FileSystemDb } from 'shared/files/FileSystem.Dexie';

import { YandexStorageProviderSettings } from '..';
import { YandexDiskClient } from '../YandexDiskClient';
import { IResource, Resource } from '../YandexDiskClient.types';
import { createOAuthUrl } from '../helpers/createOAuthUrl';

export interface ISettingsProperties {
    handshake: HandShake<YandexStorageProviderSettings>;
}

export const Settings: React.VFC<ISettingsProperties> = (properties) => {
    const [success, setSuccess] = React.useState<'loading' | 'error' | 'success'>('loading');
    const [settings, setSettings] = React.useState<YandexStorageProviderSettings>();
    const [link, setLink] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            try {
                const loadedSettings = await properties.handshake.settings.get();
                const clientId = loadedSettings?.clientId ?? `27679647b5984078abdcfdacca641201`;
                const deviceId = loadedSettings?.deviceId ?? `${Math.random() * 10_000}`;
                const deviceName = loadedSettings?.deviceName ?? navigator.userAgent.slice(0, 8);
                const fileSystem = new FileSystemDb('yandex-disk', 'disk:/');
                if (loadedSettings?.token) {
                    const client = new YandexDiskClient(loadedSettings.token);
                    const res = await client.getMetainformation('/');
                    if (res._ === 'resource') {
                        const resource = new Resource(res, client);
                        console.log(await fileSystem.addOrUpdateEntry(res.path, res.name, resource.mapToFileSystem()));
                        const embended = await resource.getAllEmbedded();
                        embended.forEach(async (x) => {
                            await fileSystem.addOrUpdateEntry(
                                x.path,
                                x.name,
                                new Resource(x, client).mapToFileSystem(),
                            );
                            if (x.name === 'Music') {
                                getNested([x], client, async (callback) => {
                                    await fileSystem.addOrUpdateEntry(callback.path, callback.name, resource.mapToFileSystem());
                                });
                            }
                        });
                    }
                }

                !loadedSettings?.clientId &&
                    (await properties.handshake.settings.addOrUpdate({
                        ...loadedSettings,
                        clientId,
                        deviceId,
                        deviceName,
                    }));
                setLink(
                    <a href={createOAuthUrl(clientId, deviceId, deviceName)} target="_blank" rel="noreferrer">
                        Авторизация
                    </a>,
                );
                setSettings(loadedSettings);
                setSuccess('success');
            } catch (error) {
                console.log(error);
                setSuccess('error');
            }
        })();
    }, [properties.handshake.settings]);

    switch (success) {
        case 'loading':
            return <div></div>;
        case 'error':
            return <div>Произошла непредвиденная ошибка</div>;
        case 'success':
            return settings?.token ? (
                <React.Fragment>
                    <div>Авторизация завершена, теперь вы можете закрыть это окно</div>
                </React.Fragment>
            ) : (
                link
            );
        default:
            return <div></div>;
    }
};

Settings.propTypes = {
    handshake: PropTypes.any,
};

function getNested(res: IResource[], client: YandexDiskClient, callback?: (nested: Resource) => Promise<void>) {
    res.forEach(async (x) => {
        const resorce = new Resource(x, client);
        const nested = await resorce.getAllEmbedded();

        callback && (await callback(resorce));
        if (x.type === 'dir') {
            getNested(nested, client);
        }
    });
}
