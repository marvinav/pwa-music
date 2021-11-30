import React, { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
// import { NavBarProps } from './layouts/NavBar';

import './ui/style.css';

import { pluginManager } from 'features/plugins';
import { Loading } from 'pages/Loading';
import { useTheme } from 'shared/ui';
import { BackgroundMemo as Background } from 'shared/ui';
import AnimatedBackground from 'static/assets/backgrounds/11.gif';
import ParticlesConfig from 'static/assets/backgrounds/particles.json';

import { AppProvider } from './model/AppProvider';
import { startUp } from './startup';

const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ 'pages/NotFound'));
const MusicPlayer = lazy(() => import(/* webpackChunkName: "MusicPlayer" */ 'pages/MusicPlayer'));

const AppContent: React.FC = () => {
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

export const App = () => (
    <AppProvider>
        <AppContent />
    </AppProvider>
);
