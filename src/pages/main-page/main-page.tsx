import Map from '@components/map/map';
import Navigation from '@components/navigation/navigation';
import Sorting from '@components/sorting/sorting';
import Layout from '@components/layout/layout';
import { offers as offerMocks } from '@src/mocks/offers';
import clsx from 'clsx';
import PlaceCardList from './components/place-card-list';
import { useEffect, useState } from 'react';
import type { Offer, OffersByCity, Location } from '@src/entities/offers';
import { useAppDispatch, useAppSelector } from '@src/hooks/store-hooks';
import { offersSelector, setOffers } from '@src/features/offers/offers-slice';

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

/**
 * Страница объявлений по выбранному городу
 */
export default function MainPage({
  city,
  location,
}: MainPageProps): JSX.Element {
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);

  const offers = useAppSelector(offersSelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setOffers(offerMocks));
  }, [dispatch]);

  const offersByCity =
    Object.groupBy(offers, (item) => item.city.name)[city] ?? [];

  const mainClass = clsx(
    'page__main page__main--index',
    offersByCity?.length === 0 && 'page__main--index-empty'
  );

  const placesContainerClass = clsx(
    'cities__places-container container',
    offersByCity?.length === 0 && 'cities__places-container--empty'
  );

  return (
    <Layout className="page page--gray page--main">
      <main className={mainClass}>
        <h1 className="visually-hidden">Cities</h1>

        <Navigation />

        <div className="cities">
          <div className={placesContainerClass}>
            {offersByCity?.length > 0 ? (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {offersByCity.length} places to stay in {city}
                </b>

                <Sorting />

                <PlaceCardList
                  offers={offersByCity}
                  setSelectedOffer={setSelectedOffer}
                />
              </section>
            ) : (
              <PlacesEmpty />
            )}

            <div className="cities__right-section">
              {offersByCity?.length > 0 && (
                <Map
                  bemblock="cities"
                  size={{ height: '100%' }}
                  location={location}
                  offers={offersByCity}
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
