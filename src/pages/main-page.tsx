import Map from '@components/map/map';
import Navigation from '@components/navigation/navigation';
import PlaceCard from '@components/place-card/place-card';
import Sorting from '@components/sorting/sorting';
import Layout from '@components/layout/layout';
import { places } from '../mocks/places';

type MainPageProps = {
  city: string;
};

export default function MainPage({ city }: MainPageProps): JSX.Element {
  return (
    <Layout className="page page--gray page--main">
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>

        <Navigation />

        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {places.length} places to stay in {city}
              </b>

              <Sorting />

              <div className="cities__places-list places__list tabs__content">
                {places.map((item) => (
                  <PlaceCard key={item.id} {...item} />
                ))}
              </div>
            </section>

            <div className="cities__right-section">
              <Map />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
