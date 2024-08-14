import { AppRoute, AuthStatus } from '@src/const';
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from '../spinner/spinner';

type AccessRouteProps = {
  status: AuthStatus;
};

const createAccessRoute = (statusToCheck: AuthStatus, fallback: AppRoute) =>
  function AccessRoute({ status }: AccessRouteProps) {
    // сравниваем переданный статус и возвращаем нужный элемент
    switch (status) {
      // вернет страницу при соответствии
      case statusToCheck:
        return <Outlet />;
      // вернет прелоадер
      case AuthStatus.Unknown:
        return <Spinner />;
      // редирект на фоллбэк при несоответствии
      default:
        return <Navigate to={fallback} />;
    }
  };

export const PrivateRoute = createAccessRoute(AuthStatus.Auth, AppRoute.Login);
export const PublicRoute = createAccessRoute(AuthStatus.NoAuth, AppRoute.Main);
