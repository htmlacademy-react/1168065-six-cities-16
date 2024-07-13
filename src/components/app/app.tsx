import Favourites from '@pages/favourites';
import MainPage from '@pages/main-page';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';
import { AppRoutes, CITIES } from '@src/const';
import OfferPage from '@src/pages/offer-page';

export default function App(): JSX.Element {
  const CitiesRoutes = CITIES.map(({ slug, name }, i) => ({
    path: slug,
    element: <MainPage city={name} />,
    index: i === 0,
  }));

  const router = createBrowserRouter([
    {
      path: AppRoutes.Main,
      element: <Navigate to={CITIES[0].slug} />,
      index: true,
    },
    {
      path: AppRoutes.Favourites,
      element: <Favourites />,
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
