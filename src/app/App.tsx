import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { NavBarProps } from './layouts/NavBar';
import { startUp } from './startup';

import './ui/style.css';
import { BackgroundMemo as Background } from 'shared/ui/layouts/Background';
import { useTheme } from 'shared/ui/components/themes';

import AnimatedBackground from 'static/assets/backgrounds/11.gif';
import ParticlesConfig from 'static/assets/backgrounds/particles.json';
import { pluginManager } from 'features/plugins';
import { Loading } from 'pages/Loading';

const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ 'pages/NotFound'));
const MusicPlayer = lazy(() => import(/* webpackChunkName: "MusicPlayer" */ 'pages/MusicPlayer'));

export const App: React.FC = () => {
    useTheme();
    startUp();
    pluginManager.loadPlugins();

    return (
        <React.Fragment>
            <Background type="img" imgSrc={AnimatedBackground} particlesConfig={ParticlesConfig}></Background>
            <Suspense fallback={<Loading />}>
                <Routes>
                    <Route path="/" element={<MusicPlayer />}></Route>
                    {/* <PluginRoute path="/plugins/:pluginId/:viewId"></PluginRoute> */}
                    <Route path="/" element={<NotFound />}></Route>
                </Routes>
            </Suspense>
        </React.Fragment>
    );
};
