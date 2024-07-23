import Layout from '@components/layout/layout';
import { favourites as favouritesMocks } from '@src/mocks/favourites';
import clsx from 'clsx';
import { OffersByCity, Offer } from '@src/entities/offers';
import { useState } from 'react';
import PlaceCard from '@src/components/place-card/place-card';

/**
 * Компонент страницы избранного при отсутствии добавленных объявлений
 */
function FavouritesEmpty(): JSX.Element {
  return (
    <div className="favorites__status-wrapper">
      <b className="favorites__status">Nothing yet saved.</b>
      <p className="favorites__status-description">
        Save properties to narrow down search or plan your future trips.
      </p>
    </div>
  );
}

/**
 * Страница избранного
 */
export default function FavouritesPage(): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [favourites, setFavourites] = useState<Offer[]>(favouritesMocks);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [favouritesByCity, setFavouritesByCity] = useState<OffersByCity>(
    Object.groupBy(favourites, ({ city }: Offer) => city.name)
  );

  const layoutClasses = clsx(
    'page',
    favourites?.length === 0 && 'page--favorites-empty'
  );

  const mainClasses = clsx(
    'page__main page__main--favorites',
    favourites?.length === 0 && 'page__main--favorites-empty'
  );

  const pageHeading =
    favourites?.length > 0 ? 'Saved listing' : 'Favorites (empty)';

  return (
    <Layout className={layoutClasses} showFooter>
      <main className={mainClasses}>
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">{pageHeading}</h1>

            {favourites?.length > 0 ? (
              <ul className="favorites__list">
                {Object.entries(favouritesByCity).map((item) => {
                  const [city, offers] = item;

                  return (
                    <li key={city} className="favorites__locations-items">
                      <div className="favorites__locations locations locations--current">
                        <div className="locations__item">
                          <a
                            className="locations__item-link"
                            href={`/${city.toLowerCase()}`}
                          >
                            <span>{city}</span>
                          </a>
                        </div>
                      </div>
                      <div className="favorites__places">
                        {offers.map((offer) => (
                          <PlaceCard
                            key={offer.id}
                            bemblock="favorites"
                            imageSize={{ width: 150, height: 110 }}
                            {...offer}
                          />
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <FavouritesEmpty />
            )}
          </section>
        </div>
      </main>
    </Layout>
  );
}
