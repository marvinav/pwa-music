import * as React from 'react';
import { RouteProps } from 'react-router-dom';

/**
 * Обертка над Route.
 * Проверяет, что пользователь авторизован на сайт.
 * Если проверка выполнена, то пользователь допускается на Роутер, переданный в пропсках.
 * Если нет, то пользователь переадресуется на страницу по умолчанию для авторизации.
 * @param props Роутинг в случае успешной авторизации
 */
export const PluginRoute: React.VFC<RouteProps> = () => {
    return <div></div>;
};
