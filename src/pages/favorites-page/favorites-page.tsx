import Layout from '@components/layout/layout';
import { Favorites as FavoritesMocks } from '@src/mocks/favorites';
import clsx from 'clsx';
import type { OffersByCity, Offer } from '@src/entities/offers';
import { useState } from 'react';
import PlaceCard from '@src/components/place-card/place-card';

/**
 * Компонент страницы избранного при отсутствии добавленных объявлений
 */
function FavoritesEmpty(): JSX.Element {
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
export default function FavoritesPage(): JSX.Element {
  const [Favorites] = useState<Offer[]>(FavoritesMocks);
  const [FavoritesByCity] = useState<OffersByCity>(
    Object.groupBy(Favorites, ({ city }: Offer) => city.name)
  );

  const layoutClasses = clsx(
    'page',
    Favorites?.length === 0 && 'page--favorites-empty'
  );

  const mainClasses = clsx(
    'page__main page__main--favorites',
    Favorites?.length === 0 && 'page__main--favorites-empty'
  );

  const pageHeading =
    Favorites?.length > 0 ? 'Saved listing' : 'Favorites (empty)';

  return (
    <Layout className={layoutClasses} showFooter>
      <main className={mainClasses}>
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">{pageHeading}</h1>

            {Favorites?.length > 0 ? (
              <ul className="favorites__list">
                {Object.entries(FavoritesByCity).map((item) => {
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
                        {offers!.map((offer) => (
                          <PlaceCard
                            key={offer.id}
                            bemblock="favorites"
                            imageSize={{ width: 150, height: 110 }}
                            place={offer}
                          />
                        ))}
                      </div>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <FavoritesEmpty />
            )}
          </section>
        </div>
      </main>
    </Layout>
  );
}
