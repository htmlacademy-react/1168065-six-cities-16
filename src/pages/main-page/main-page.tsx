import Map from '@components/map/map';
import Navigation from '@components/navigation/navigation';
import Sorting from '@components/sorting/sorting';
import Layout from '@components/layout/layout';
import clsx from 'clsx';
import PlaceCardList from './components/place-card-list';
import { useEffect, useMemo, useState } from 'react';
import type { Offer, Location } from '@src/entities/offers';
import { useAppDispatch, useAppSelector } from '@src/hooks/store-hooks';
import { fetchOffers, getOffers } from '@src/store/slices/offers-slice';
import { getActiveSorting } from '@src/store/slices/sorting-slice';
import { SortingOptionValue } from '@src/const';

/**
 * Если объявлений нет
 */
function PlacesEmpty(): JSX.Element {
  return (
    <section className="cities__no-places">
      <div className="cities__status-wrapper tabs__content">
        <b className="cities__status">No places to stay available</b>
        <p className="cities__status-description">
          We could not find any property available at the moment in Dusseldorf
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
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const offers = useAppSelector(getOffers);
  const activeSorting = useAppSelector(getActiveSorting);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOffers());
  }, [dispatch]);

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
          <div className={placesContainerClass}>
            {currentOffers?.length > 0 ? (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {currentOffers.length} places to stay in {city}
                </b>

                <Sorting />

                <PlaceCardList
                  offers={offersByCitySorted}
                  setSelectedOffer={setSelectedOffer}
                />
              </section>
            ) : (
              <PlacesEmpty />
            )}

            <div className="cities__right-section">
              {currentOffers?.length > 0 && (
                <Map
                  bemblock="cities"
                  size={{ height: '100%' }}
                  location={location}
                  offers={currentOffers}
                  active={selectedOffer}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
