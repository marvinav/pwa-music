import React, { Suspense, lazy } from 'react';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { Loading } from './pages/Loading';
import { BackgroundMemo as Background } from './layouts/Background';
import { NavBar, NavBarProps } from './layouts/NavBar';
import { PluginRoute } from './services/PluginRoute';

const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home'));

// Входная точка приложения.
// Корень всего сайта.

const links: NavBarProps['links'] = [
    {
        id: 'home',
        label: 'Home',
        path: '/',
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

    return (
        <React.Fragment>
            <Background particlesConfig={require('../static/assets/particles.json')}></Background>
            <NavBar links={links} key="nav-bar" onClick={history.push} section={`/${math.params?.section ?? ''}`} />
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <PluginRoute path="/plugins/:pluginId/:viewId"></PluginRoute>
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </React.Fragment>
    );
};

export default App;
