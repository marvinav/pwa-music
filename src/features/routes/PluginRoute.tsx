import * as React from 'react';
import { Route, RouteProps, useParams } from 'react-router-dom';
import { usePlugin } from 'entities/contexts/PluginContext';

/**
 * Обертка над Route.
 * Проверяет, что пользователь авторизован на сайт.
 * Если проверка выполнена, то пользователь допускается на Роутер, переданный в пропсках.
 * Если нет, то пользователь переадресуется на страницу по умолчанию для авторизации.
 * @param props Роутинг в случае успешной авторизации
 */
const PluginRouteChildren: React.VFC = () => {
    const { pluginId, viewId } = useParams();
    const ref = React.useRef();
    const { getRoute } = usePlugin();

    const plugin = getRoute(pluginId, viewId);

    React.useEffect(() => {
        if (plugin && plugin._ !== 'loading') {
            plugin.render(ref.current);
        }
    }, [plugin]);
    return <div key={pluginId + viewId} ref={ref}></div>;
};

export const PluginRoute: React.VFC<RouteProps> = (props) => {
    return (
        <Route {...props}>
            <PluginRouteChildren />
        </Route>
    );
};
