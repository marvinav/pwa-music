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
    const ref = React.useRef();

    const { getSettings } = usePlugin();
    const yandexDisk = getSettings('marvinav', 'yandex-disk');

    React.useEffect(() => {
        if (yandexDisk && yandexDisk._ !== 'loading') {
            yandexDisk.render(ref.current);
        }
    }, [yandexDisk]);

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
            <section id="yandex.disk" ref={ref}></section>
            <section id="experience"></section>
        </div>
    );
};

export default Home;
