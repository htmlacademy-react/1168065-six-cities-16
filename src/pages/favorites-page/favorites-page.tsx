import Layout from '@components/layout/layout';
import clsx from 'clsx';
import type { OffersByCity, Offer } from '@src/entities/offers';
import { useMemo } from 'react';
import PlaceCard from '@src/components/place-card/place-card';
import { useAppSelector } from '@src/hooks/store-hooks';
import { getFavorites } from '@src/store/slices/favorites-slice';

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
  const favorites = useAppSelector(getFavorites);

  const favoritesByCity = useMemo<OffersByCity>(
    () => Object.groupBy(favorites, ({ city }: Offer) => city.name),
    [favorites]
  );

  const layoutClasses = clsx(
    'page',
    favorites?.length === 0 && 'page--favorites-empty'
  );

  const mainClasses = clsx(
    'page__main page__main--favorites',
    favorites.length === 0 && 'page__main--favorites-empty'
  );

  const sectionClasses = clsx(
    'favorites',
    favorites.length === 0 && 'favorites--empty'
  );

  const pageHeadingClasses = clsx(
    favorites.length > 0 && 'favorites__title',
    favorites.length === 0 && 'visually-hidden'
  );

  const pageHeading =
    favorites?.length > 0 ? 'Saved listing' : 'Favorites (empty)';

  return (
    <Layout className={layoutClasses} showFooter>
      <main className={mainClasses}>
        <div className="page__favorites-container container">
          <section className={sectionClasses}>
            <h1 className={pageHeadingClasses}>{pageHeading}</h1>

            {favorites?.length > 0 ? (
              <ul className="favorites__list">
                {Object.entries(favoritesByCity).map((item) => {
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
