import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { AppRoute, CITIES } from '@src/const';
import OfferPage from '@src/pages/offer-page/offer-page';
import MainPage from '@src/pages/main-page/main-page';
import FavoritesPage from '@src/pages/favorites-page/favorites-page';
import NotFoundPage from '@src/pages/error-page/not-found-page';
import { PrivateRoute, PublicRoute } from '../access-route/access-route';
import LoginPage from '@src/pages/login-page/login-page';
import { offerLoader } from '@src/pages/offer-page/loader';

export default function App(): JSX.Element {
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
      errorElement: <Navigate to={AppRoute.NotFound} />,
    },
    {
      path: AppRoute.NotFound,
      element: <NotFoundPage />,
    },
    {
      element: <PrivateRoute />,
      children: privateRoutes,
    },
    {
      element: <PublicRoute />,
      children: publicRoutes,
    },
    {
      path: AppRoute.Offer,
      children: [
        {
          path: ':id',
          element: <OfferPage />,
          loader: offerLoader,
        },
      ],
    },
    ...citiesRoutes,
  ]);

  return <RouterProvider router={router} />;
}
