import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { AppRoutes, CITIES } from '@src/const';
import OfferPage from '@src/pages/offer-page/offer-page';
import MainPage from '@src/pages/main-page/main-page';
import FavouritesPage from '@src/pages/favourites-page/favourites-page';

export default function App(): JSX.Element {
  const CitiesRoutes = CITIES.map(({ slug, name }) => ({
    path: slug,
    element: <MainPage city={name} />,
  }));

  const router = createBrowserRouter([
    {
      path: AppRoutes.Main,
      element: <Navigate to={CITIES[0].slug} />,
      index: true,
    },
    {
      path: AppRoutes.Favourites,
      element: <FavouritesPage />,
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
    ...CitiesRoutes,
  ]);

  return <RouterProvider router={router} />;
}
