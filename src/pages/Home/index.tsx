import localforage from 'localforage';
import React from 'react';

import { useDictionary } from 'entities/dictionary';
import { usePlugin } from 'features/plugins';
import { env } from 'shared/env/env';
import { Icon } from 'shared/ui/components/Icon';
import { Shined } from 'shared/ui/components/Shined';

const Home: React.VFC = () => {
    const { d } = useDictionary();
    const AvatarMemo = React.useMemo(() => <Icon className="avatar" src={env.GIT_HUB_AVATAR}></Icon>, []);
    const reference = React.useRef();

    const { getSettings } = usePlugin();
    const yandexDisk = getSettings('marvinav', 'yandex-disk');

    React.useEffect(() => {
        if (yandexDisk && yandexDisk._ !== 'loading') {
            yandexDisk.render(reference.current);
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
            <section id="yandex.disk" ref={reference}></section>
            <section id="experience">
                <button
                    onClick={async (_event) => {
                        const response = await fetch(
                            'https://downloader.disk.yandex.ru/disk/cae8fc945b1a4a1f1c0f879bc96940d787ef3c58f8f126a00e12fcb94341956b/61572b8c/dYt8G3le4c_Tth3j_xK2tw0uvQQTw0BpOOb3vUYcOATEBT1jmUxt9u9Cjkzx_wS4-PpZXbtFjLFWhibmGF5X0Q%3D%3D?uid=216702572&filename=Kuramae%20Station%20-%20Digital%20Dreams%20Analog%20Tube.mp3&disposition=attachment&hash=&limit=0&content_type=audio%2Fmpeg&owner_uid=216702572&fsize=595948&hid=dc0daf90d0cf7289f69b4dc3570e23ca&media_type=audio&tknv=v2&etag=5eb559e4d69cae2ebb600a3d61bbe7c2',
                        );
                        console.log({ status: response.status });
                        const result = await localforage.setItem('file', response.blob());
                        const audio = new Audio(URL.createObjectURL(result));
                        await audio.play();
                        audio.pause();
                    }}
                ></button>
            </section>
        </div>
    );
};

export default Home;
