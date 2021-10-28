import React from 'react';
import PropTypes from 'prop-types';
import { YandexStorageProviderSettings } from '..';
import { Loading } from '../../../../pages/Loading';
import { HandShake } from '../../../shared/BasePlugin';
import { createOAuthUrl } from '../helpers/createOAuthUrl';
import { YandexDiskClient } from '../YandexDiskClient';
import { IResource, Resource } from '../YandexDiskClient.types';
import { FileSystemDb } from '../../../../models/FileSystem.Dexie';

export interface ISettingsProps {
    handshake: HandShake<YandexStorageProviderSettings>;
}

export const Settings: React.VFC<ISettingsProps> = (props) => {
    const [success, setSuccess] = React.useState<'loading' | 'error' | 'success'>('loading');
    const [settings, setSettings] = React.useState<YandexStorageProviderSettings>();
    const [link, setLink] = React.useState(null);

    React.useEffect(() => {
        (async () => {
            try {
                const loadedSettings = await props.handshake.settings.get();
                const clientId = loadedSettings?.clientId ?? `27679647b5984078abdcfdacca641201`;
                const deviceId = loadedSettings?.deviceId ?? `${Math.random() * 10000}`;
                const deviceName = loadedSettings?.deviceName ?? navigator.userAgent.substr(0, 8);
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
                                getNested([x], client, async (cb) => {
                                    await fileSystem.addOrUpdateEntry(cb.path, cb.name, resource.mapToFileSystem());
                                });
                            }
                        });
                    }
                }

                !loadedSettings?.clientId &&
                    (await props.handshake.settings.addOrUpdate({
                        ...(loadedSettings ?? {}),
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
            } catch (err) {
                console.log(err);
                setSuccess('error');
            }
        })();
    }, [props.handshake.settings]);

    switch (success) {
        case 'loading':
            return <Loading></Loading>;
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
            return <Loading></Loading>;
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
