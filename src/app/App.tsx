import React, { Suspense, lazy } from 'react';
import { Loading } from 'pages/Loading';
import { BackgroundMemo as Background } from 'shared/ui/layouts/Background';
// import { NavBarProps } from './layouts/NavBar';

import './index.css';
import { useTheme } from 'shared/ui/components/themes';

import AnimatedBackground from 'static/assets/backgrounds/11.gif';
import ParticlesConfig from 'static/assets/backgrounds/particles.json';

import { startUp } from './startup';
import { pluginManager } from 'features/plugins/PluginManager';
import { Route, Routes } from 'react-router-dom';

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
