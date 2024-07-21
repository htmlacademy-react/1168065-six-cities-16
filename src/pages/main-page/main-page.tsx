import Map from '@components/map/map';
import Navigation from '@components/navigation/navigation';
import Sorting from '@components/sorting/sorting';
import Layout from '@components/layout/layout';
import { places } from '@src/mocks/places';
import clsx from 'clsx';
import PlaceCardList from './components/place-card-list';
import { useState } from 'react';

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

  const mainClass = clsx(
    'page__main page__main--index',
    places?.length === 0 && 'page__main--index-empty'
  );

  const placesContainerClass = clsx(
    'cities__places-container container',
    places?.length === 0 && 'cities__places-container--empty'
  );

  return (
    <Layout className="page page--gray page--main">
      <main className={mainClass}>
        <h1 className="visually-hidden">Cities</h1>

        <Navigation />

        <div className="cities">
          <div className={placesContainerClass}>
            {places?.length > 0 ? (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {places.length} places to stay in {city}
                </b>

                <Sorting />

                <PlaceCardList
                  places={places}
                  setSelectedOffer={setSelectedOffer}
                />
              </section>
            ) : (
              <PlacesEmpty />
            )}

            <div className="cities__right-section">
              {places?.length > 0 && <Map />}
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
