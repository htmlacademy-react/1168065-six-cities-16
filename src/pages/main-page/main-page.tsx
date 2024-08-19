import Map from '@components/map/map';
import Navigation from '@components/navigation/navigation';
import Sorting from '@components/sorting/sorting';
import Layout from '@components/layout/layout';
import clsx from 'clsx';
import PlaceCardList from './components/place-card-list';
import { useEffect, useMemo } from 'react';
import type { Offer, Location } from '@src/entities/offers';
import { useAppDispatch, useAppSelector } from '@src/hooks/store-hooks';
import {
  getOffers,
  getOffersLoadingStatus,
} from '@src/store/slices/offers-slice';
import { getActiveSorting } from '@src/store/slices/sorting-slice';
import { AuthStatus, SortingOptionValue } from '@src/const';
import Spinner from '@src/components/spinner/spinner';
import { getAuthStatus } from '@src/store/slices/user-slice';
import { fetchOffers } from '@src/store/thunks/offers';
import { pluralize } from '@src/utils/formatters';

type PlacesEmptyProps = {
  city: string;
};

/**
 * Если объявлений нет
 */
function PlacesEmpty({ city }: PlacesEmptyProps): JSX.Element {
  return (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">
          We could not find any property available at the moment in {city}
        </p>
      </div>
    </section>
  );
}

type MainPageProps = {
  city: string;
  location: Location;
};

const OFFERS_FALLBACK = [] as Offer[];

/**
 * Страница объявлений по выбранному городу
 */
export default function MainPage({
  city,
  location,
}: MainPageProps): JSX.Element {
  const userStatus = useAppSelector(getAuthStatus);
  const offers = useAppSelector(getOffers);
  const activeSorting = useAppSelector(getActiveSorting);
  const offersLoadingStatus = useAppSelector(getOffersLoadingStatus);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (userStatus !== AuthStatus.Unknown) {
      dispatch(fetchOffers());
    }
  }, [userStatus]);

  // группируем полученные предложения по городам
  const offersByCity = useMemo(
    () => Object.groupBy(offers, (item) => item.city.name),
    [offers]
  );

  // выбираем объявления по текущему городу
  const currentOffers = offersByCity[city] ?? OFFERS_FALLBACK;

  // сортировка оъявлений по выбранному фильтру
  const offersByCitySorted = useMemo(
    () =>
      currentOffers.toSorted((a, b) => {
        switch (activeSorting.value) {
          case SortingOptionValue.PriceHighToLow:
            return b.price - a.price;
          case SortingOptionValue.PriceLowToHigh:
            return a.price - b.price;
          case SortingOptionValue.TopRatedFirst:
            return b.rating - a.rating;
          default:
            return 0;
        }
      }),
    [currentOffers, activeSorting.value]
  );

  const mainClass = clsx(
    'page__main page__main--index',
    currentOffers?.length === 0 && 'page__main--index-empty'
  );

  const placesContainerClass = clsx(
    'cities__places-container container',
    currentOffers?.length === 0 && 'cities__places-container--empty'
  );

  return (
    <Layout className="page page--gray page--main">
      <main className={mainClass}>
        <h1 className="visually-hidden">Cities</h1>

        <Navigation />

        <div className="cities">
          {!offersLoadingStatus && (
            <div className={placesContainerClass}>
              {currentOffers?.length > 0 ? (
                <section className="cities__places places">
                  <h2 className="visually-hidden">Places</h2>
                  <b className="places__found">
                    {pluralize(currentOffers.length, 'place')} to stay in {city}
                  </b>

                  <Sorting />

                  <PlaceCardList offers={offersByCitySorted} />
                </section>
              ) : (
                <PlacesEmpty city={city} />
              )}

              <div className="cities__right-section">
                {currentOffers?.length > 0 && (
                  <Map
                    bemblock="cities"
                    size={{ height: '100%' }}
                    location={location}
                    offers={currentOffers}
                  />
                )}
              </div>
            </div>
          )}

          {offersLoadingStatus && <Spinner />}
        </div>
      </main>
    </Layout>
  );
}
