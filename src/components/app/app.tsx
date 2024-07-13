import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { AppRoutes, AuthStatus, CITIES } from '@src/const';
import OfferPage from '@src/pages/offer-page/offer-page';
import MainPage from '@src/pages/main-page/main-page';
import FavouritesPage from '@src/pages/favourites-page/favourites-page';
import NotFoundPage from '@src/pages/error-page/not-found-page';
import { PrivateRoute } from '../access-route/access-route';
import LoginPage from '@src/pages/login-page/login-page';

export default function App(): JSX.Element {
  const userStatus: AuthStatus = AuthStatus.NoAuth;

  const citiesRoutes = CITIES.map(({ slug, name }) => ({
    path: slug,
    element: <MainPage city={name} />,
  }));

  const privateRoutes = [
    {
      path: AppRoutes.Favourites,
      element: <FavouritesPage />,
    },
  ];

  const router = createBrowserRouter([
    {
      path: AppRoutes.Main,
      element: <Navigate to={CITIES[0].slug} />,
      index: true,
      errorElement: <NotFoundPage />,
    },
    {
      element: <PrivateRoute status={userStatus} />,
      children: privateRoutes,
    },
    {
      path: AppRoutes.Login,
      element: <LoginPage />,
    },
    {
      path: AppRoutes.Offer,
      children: [
        {
          path: ':id',
          element: <OfferPage />,
        },
      ],
    },
    ...citiesRoutes,
  ]);

  return <RouterProvider router={router} />;
}
