import * as React from 'react';
import { Route, RouteProps } from 'react-router-dom';

/**
 * Обертка над Route.
 * Проверяет, что пользователь авторизован на сайт.
 * Если проверка выполнена, то пользователь допускается на Роутер, переданный в пропсках.
 * Если нет, то пользователь переадресуется на страницу по умолчанию для авторизации.
 * @param props Роутинг в случае успешной авторизации
 */
const ProtectedRoute = (props: RouteProps) => {
    // const { me } = useAuth();
    // if (me) {
    //     return <Route {...props} />;
    // } else {
    //     return <SignIn></SignIn>;
    // }
};

export default ProtectedRoute;
