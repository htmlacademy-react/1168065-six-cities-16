import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { AppRoute, CITIES } from '@src/const';
import OfferPage from '@src/pages/offer-page/offer-page';
import MainPage from '@src/pages/main-page/main-page';
import FavoritesPage from '@src/pages/Favorites-page/Favorites-page';
import NotFoundPage from '@src/pages/error-page/not-found-page';
import { PrivateRoute, PublicRoute } from '../access-route/access-route';
import LoginPage from '@src/pages/login-page/login-page';
import { useAppDispatch, useAppSelector } from '@src/hooks/store-hooks';
import { checkAuth, getAuthStatus } from '@src/store/slices/user-slice';
import { useEffect } from 'react';

export default function App(): JSX.Element {
  const userStatus = useAppSelector(getAuthStatus);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, []);

  /**
   * Сгенерированные роуты по городам
   */
  const citiesRoutes = CITIES.map(({ slug, name, location }) => ({
    path: slug,
    element: <MainPage city={name} location={location} />,
  }));

  /**
   * Приватные роуты
   */
  const privateRoutes = [
    {
      path: AppRoute.Favorites,
      element: <FavoritesPage />,
    },
  ];

  /**
   * Публичные роуты
   */
  const publicRoutes = [
    {
      path: AppRoute.Login,
      element: <LoginPage />,
    },
  ];

  const router = createBrowserRouter([
    {
      path: AppRoute.Main,
      element: <Navigate to={CITIES[0].slug} />,
      index: true,
      errorElement: <NotFoundPage />,
    },
    {
      element: <PrivateRoute status={userStatus} />,
      children: privateRoutes,
    },
    {
      element: <PublicRoute status={userStatus} />,
      children: publicRoutes,
    },
    {
      path: AppRoute.Offer,
      children: [
        {
          path: ':id',
          element: <OfferPage userStatus={userStatus} />,
        },
      ],
    },
    ...citiesRoutes,
  ]);

  return <RouterProvider router={router} />;
}
