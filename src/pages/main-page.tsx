import Map from '@components/map/map';
import Navigation from '@components/navigation/navigation';
import PlaceCard from '@components/place-card/place-card';
import Sorting from '@components/sorting/sorting';
import Layout from '@components/layout/layout';
import { places } from '../mocks/places';

type MainPageProps = {
  placesAmount: number;
};

export default function MainPage({ placesAmount }: MainPageProps): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <Layout>
        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>

          <Navigation />

          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {placesAmount} places to stay in Amsterdam
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
    </div>
  );
}
