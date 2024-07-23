import Map from '@components/map/map';
import Navigation from '@components/navigation/navigation';
import Sorting from '@components/sorting/sorting';
import Layout from '@components/layout/layout';
import { offers as offerMocks } from '@src/mocks/offers';
import clsx from 'clsx';
import PlaceCardList from './components/place-card-list';
import { useEffect, useState } from 'react';
import { Offer, OffersByCity } from '@src/entities/offers';

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
};

/**
 * Страница объявлений по выбранному городу
 */
export default function MainPage({ city }: MainPageProps): JSX.Element {
  // временно отключил, поскольку пока не знадействовано
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedOffer, setSelectedOffer] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [offers, setOffers] = useState<OffersByCity>(
    // По какой-то причине тс не распознает Object.groupBy
    // Также не очень понятно, как типизировать получившийся объект, чтобы не было any
    // Argument of type 'Partial<Record<string, Offer[]>>' is not assignable to parameter of type 'OffersByCity | (() => OffersByCity)'.ts(2345)
    Object.groupBy(offerMocks, (item: Offer) => item.city.name)
  );
  const [offersByCity, setOffersByCity] = useState<Offer[]>([]);

  useEffect(
    // записываем в стейт предложения по выбранному городу или пустой массив
    () => (offers[city] ? setOffersByCity(offers[city]) : setOffersByCity([])),
    [city]
  );

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
                  places={offersByCity}
                  setSelectedOffer={setSelectedOffer}
                />
              </section>
            ) : (
              <PlacesEmpty />
            )}

            <div className="cities__right-section">
              {offersByCity?.length > 0 && <Map />}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
