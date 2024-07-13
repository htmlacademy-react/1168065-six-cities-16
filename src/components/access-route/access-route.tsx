import { AppRoutes, AuthStatus } from '@src/const';
import { Navigate, Outlet } from 'react-router-dom';

type AccessRouteProps = {
  status: AuthStatus;
};

const createAccessRoute = (statusToCheck: AuthStatus, fallback: AppRoutes) =>
  function AccessRoute({ status }: AccessRouteProps) {
    // сравниваем переданный статус и возвращаем нужный элемент
    switch (status) {
      // вернет страницу при соответствии
      case statusToCheck:
        return <Outlet />;
      // вернет прелоадер
      case AuthStatus.Unknown:
        return 'Loading...';
      // редирект на фоллбэк при несоответствии
      default:
        return <Navigate to={fallback} />;
    }
  };

export const PrivateRoute = createAccessRoute(AuthStatus.Auth, AppRoutes.Login);
export const PublicRoute = createAccessRoute(AuthStatus.NoAuth, AppRoutes.Main);
