import React from 'react';
import { Icon } from '../../components/Icon';
import { Shined } from '../../components/Shined';
import { gitHubAvatar } from '../../constants';
import { useDictionary } from '../../contexts/DictionaryContext';
import { usePlugin } from '../../contexts/PluginContext';
import './index.scss';

const Home: React.VFC = () => {
    const { d } = useDictionary();
    const AvatarMemo = React.useMemo(() => <Icon className="avatar" src={gitHubAvatar}></Icon>, []);

    const { getRoute } = usePlugin();
    const yandexDisk = getRoute('yandex-disk', 'oauth-token-handler');

    return (
        <div id="home-container" className="container align-center">
            <Shined size={148}>
                {(opt) => {
                    return (
                        <React.Fragment>
                            <section
                                id="short-bio"
                                tabIndex={0}
                                className="paper-1 rounded focusable shine-shadow"
                                onMouseLeave={opt.onMouseLeave}
                                onMouseEnter={opt.onMouseEnter}
                                onMouseMove={opt.onMouseMove}
                            >
                                {opt.shine}
                                {AvatarMemo}
                                <summary className="details" style={{ overflow: 'hidden' }}>
                                    <h1>marvinav</h1>
                                    <p>{d('Hi')}</p>
                                    <p>I am web developer from Moscow.</p>
                                </summary>
                            </section>
                        </React.Fragment>
                    );
                }}
            </Shined>
            <section id="yandex.disk">{yandexDisk && yandexDisk._ !== 'loading' ? yandexDisk.render() : null}</section>
            <section id="experience"></section>
        </div>
    );
};

export default Home;
