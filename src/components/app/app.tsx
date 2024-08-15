import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from 'react-router-dom';
import { APIRoute, AppRoute, CITIES } from '@src/const';
import OfferPage from '@src/pages/offer-page/offer-page';
import MainPage from '@src/pages/main-page/main-page';
import FavoritesPage from '@src/pages/favorites-page/favorites-page';
import NotFoundPage from '@src/pages/error-page/not-found-page';
import { PrivateRoute, PublicRoute } from '../access-route/access-route';
import LoginPage from '@src/pages/login-page/login-page';
import type { OfferDetailed, Offer } from '@src/entities/offers';
import store, { api } from '@src/store';
import { fetchNearbyOffers, fetchOfferDetails } from '@src/store/thunks/offers';

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
          // loader: async ({ params }) => {
          //   const id = params.id!; // id будет всегда

          //   const offerData = store.dispatch(fetchOfferDetails(id)).unwrap();
          //   const nearbyOffersData = store
          //     .dispatch(fetchNearbyOffers(id))
          //     .unwrap();

          //   return await Promise.allSettled([
          //     offerData,
          //     // commentsData,
          //     nearbyOffersData,
          //   ]).then(([offer]) => {
          //     console.log(offer);

          //     if (offer.status === 'rejected') {
          //       return redirect(AppRoute.NotFound);
          //     }

          //     return null;
          //   });
          // },
        },
      ],
    },
    ...citiesRoutes,
  ]);

  return <RouterProvider router={router} />;
}
