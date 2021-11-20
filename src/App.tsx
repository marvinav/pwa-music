import React, { Suspense, lazy } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { Loading } from './pages/Loading';
import { BackgroundMemo as Background } from './layouts/Background';
import { NavBar, NavBarProps } from './layouts/NavBar';
import { PluginRoute } from './services/PluginRoute';
import AnimatedBackground from '../static/assets/backgrounds/11.gif';
import { useThemeVariables } from './components/utils/themeVariables';

const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home'));
const MusicPlayer = lazy(() => import(/* webpackChunkName: "MusicPlayer" */ './pages/MusicPlayer'));

// Входная точка приложения.
// Корень всего сайта.

const links: NavBarProps['links'] = [
    {
        id: 'music-player',
        label: 'Player',
        path: '/',
    },
    {
        id: 'home',
        label: 'Home',
        path: '/home',
    },
    {
        id: 'about',
        label: 'About',
        path: '/about',
    },
    {
        id: 'blog',
        label: 'Blog',
        path: '/blog',
    },
];

const App: React.FC = () => {
    const math = useRouteMatch<{ section: string }>('/:section?');
    const history = useHistory();
    useThemeVariables();
    return (
        <React.Fragment>
            <Background
                type="img"
                imgSrc={AnimatedBackground}
                particlesConfig={require('../static/assets/backgrounds/particles.json')}
            ></Background>
            <NavBar links={links} key="nav-bar" onClick={history.push} section={`/${math.params?.section ?? ''}`} />
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route path="/" exact component={MusicPlayer}></Route>
                    <Route path="/home" component={Home}></Route>
                    <PluginRoute path="/plugins/:pluginId/:viewId"></PluginRoute>
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </React.Fragment>
    );
};

export default App;
