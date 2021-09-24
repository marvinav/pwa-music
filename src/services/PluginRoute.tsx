import * as React from 'react';
import { RouteProps, useParams } from 'react-router-dom';
import { PluginManager } from './PluginManager';

/**
 * Обертка над Route.
 * Проверяет, что пользователь авторизован на сайт.
 * Если проверка выполнена, то пользователь допускается на Роутер, переданный в пропсках.
 * Если нет, то пользователь переадресуется на страницу по умолчанию для авторизации.
 * @param props Роутинг в случае успешной авторизации
 */
export const PluginRoute: React.VFC<RouteProps> = () => {
    const params = useParams();
    const [plugins, setPlugins] = React.useState(new PluginManager());
    console.log(params);
    return <div></div>;
};
