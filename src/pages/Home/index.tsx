import React from 'react';
import { Icon } from '../../components/Icon';
import { Shined } from '../../components/Shined';
import { gitHubAvatar } from '../../constants';
import { useDictionary } from '../../contexts/DictionaryContext';
import { usePlugin } from '../../contexts/PluginContext';
import { cachedFailbackToNetworkFetch } from '../../utils/helpers';
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

    React.useEffect(() => {
        (async () => {
            const src = await cachedFailbackToNetworkFetch(
                'https://downloader.disk.yandex.ru/disk/e5adfd63840093aff87104fbbc15afa661215f2e27092e5690a854425e215c8c/61549dc3/dYt8G3le4c_Tth3j_xK2t1FLHqwWw5f6e_gf-_aGnXYkGBS0ay9pJR_LSZ1fxUBa95Sq84k7AZ49EIBd7R9MGA%3D%3D?uid=216702572&filename=Innamorati%20-%20Toto%20Cutugno.mp3&disposition=attachment&hash=&limit=0&content_type=audio%2Fmpeg&owner_uid=216702572&fsize=7532875&hid=0cc6a2e3835c2df8fd97e8d6f326ec70&media_type=audio&tknv=v2&etag=5154026200b644fd4eaf202ac2c1c6a1',
            );
            console.log(src);
        })();
    }, []);
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
