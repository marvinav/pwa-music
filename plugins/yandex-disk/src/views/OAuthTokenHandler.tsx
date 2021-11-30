import PropTypes from 'prop-types';
import React from 'react';

import { HandShake } from 'entities/plugins/types';
import { Loading } from 'pages/Loading';

import { YandexStorageProviderSettings } from '..';
import { parseHash } from '../helpers/parseHash';

export interface IOAuthTokenHandlerProperties {
    handshake: HandShake<YandexStorageProviderSettings>;
}

export const OAuthTokenHandler: React.VFC<IOAuthTokenHandlerProperties> = (properties) => {
    const auth = document.location.hash && parseHash(document.location.hash);
    const [success, setSuccess] = React.useState<'loading' | 'error' | 'success'>('loading');

    React.useEffect(() => {
        if (auth) {
            (async () => {
                try {
                    let settings = await properties.handshake.settings.get();
                    settings = { ...settings, ...auth, expiresIn: new Date(Date.now() + auth.expiresIn) };
                    await properties.handshake.settings.addOrUpdate(settings);
                    setSuccess('success');
                } catch {
                    setSuccess('error');
                }
            })();
        }
    }, [auth, properties.handshake.settings]);

    switch (success) {
        case 'loading':
            return <Loading></Loading>;
        case 'error':
            return <div>Произошла непредвиденная ошибка</div>;
        case 'success':
            return <div>Авторизация завершена, теперь вы можете закрыть это окно</div>;
        default:
            return <Loading></Loading>;
    }
};

OAuthTokenHandler.propTypes = {
    handshake: PropTypes.any,
};
