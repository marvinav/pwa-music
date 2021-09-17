import React, { Suspense, lazy } from 'react';
import { hot } from 'react-hot-loader/root';
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import { Loading } from './pages/Loading';
import { BackgroundMemo as Background } from './layouts/Background';
import { NavBar } from './layouts/NavBar';

const NotFound = lazy(() => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'));
const Home = lazy(() => import(/* webpackChunkName: "Home" */ './pages/Home'));

// Входная точка приложения.
// Корень всего сайта.

const App = () => {
    const math = useRouteMatch<{ section: string }>('/:section?');
    const history = useHistory();

    return (
        <React.Fragment>
            <Background particlesConfig={require('../static/assets/particles.json')}></Background>
            <NavBar key="nav-bar" onClick={history.push} section={math.params?.section} />
            <Suspense fallback={<Loading />}>
                <Switch>
                    <Route path="/" exact component={Home}></Route>
                    <Route component={NotFound} />
                </Switch>
            </Suspense>
        </React.Fragment>
    );
};

export default hot(App);
