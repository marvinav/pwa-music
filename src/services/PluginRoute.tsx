import * as React from 'react';
import { Route, RouteProps, useParams } from 'react-router-dom';
import { usePlugin } from '../contexts/PluginContext';

/**
 * Обертка над Route.
 * Проверяет, что пользователь авторизован на сайт.
 * Если проверка выполнена, то пользователь допускается на Роутер, переданный в пропсках.
 * Если нет, то пользователь переадресуется на страницу по умолчанию для авторизации.
 * @param props Роутинг в случае успешной авторизации
 */
const PluginRouteChildren: React.VFC = () => {
    const { pluginId, viewId } = useParams<{ pluginId: string; viewId: string }>();

    const { getRoute } = usePlugin();

    const plugin = getRoute(pluginId, viewId);

    console.log({ plugin, pluginId, viewId });

    return <div>{plugin && plugin._ !== 'loading' ? plugin.render() : null}</div>;
};

export const PluginRoute: React.VFC<RouteProps> = (props) => {
    return <Route {...props} component={PluginRouteChildren}></Route>;
};
