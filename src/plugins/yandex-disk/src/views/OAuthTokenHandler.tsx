import React from 'react';
import PropTypes from 'prop-types';
import { YandexStorageProviderSettings } from '..';
import { Loading } from '../../../../pages/Loading';
import { HandShake } from '../../../shared/BasePlugin';
import { parseHash } from '../helpers/parseHash';

export interface IOAuthTokenHandlerProps {
    handshake: HandShake<YandexStorageProviderSettings>;
}

export const OAuthTokenHandler: React.VFC<IOAuthTokenHandlerProps> = (props) => {
    const auth = document.location.hash && parseHash(document.location.hash);
    const [success, setSuccess] = React.useState<'loading' | 'error' | 'success'>('loading');

    React.useEffect(() => {
        if (auth) {
            (async () => {
                try {
                    let settings = await props.handshake.settings.get();
                    settings = { ...settings, ...auth, expiresIn: new Date(new Date().getTime() + auth.expiresIn) };
                    await props.handshake.settings.addOrUpdate(settings);
                    setSuccess('success');
                } catch {
                    setSuccess('error');
                }
            })();
        }
    }, [auth, props.handshake.settings]);

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
