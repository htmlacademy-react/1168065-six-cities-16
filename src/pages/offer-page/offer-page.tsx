import Layout from '@components/layout/layout';
import BookmarkButton from '@src/components/bookmark-button/bookmark-button';
import Map from '@src/components/map/map';
import PlaceCard from '@src/components/place-card/place-card';
import Rating from '@src/components/rating/rating';
import { AuthStatus, OFFER_MAX_NEARBY } from '@src/const';
import { useAppDispatch, useAppSelector } from '@src/hooks/store-hooks';
import { getComments } from '@src/store/slices/comments-slice';
import { getNearbyOffers, getOfferInfo } from '@src/store/slices/offer-slice';
import { setActiveOffer } from '@src/store/slices/offers-slice';
import { getAuthStatus } from '@src/store/slices/user-slice';
import { fetchComments } from '@src/store/thunks/comments';
import { fetchNearbyOffers, fetchOfferDetails } from '@src/store/thunks/offer';
import { capitalizeFirstLetter } from '@src/utils/formatters';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Comments from './components/comments';
import Gallery from './components/gallery';
import Goods from './components/goods';
import Host from './components/host';
import ReviewForm from './components/review-form';

/**
 * Страница предложения
 */
export default function OfferPage(): JSX.Element {
  const { id } = useParams();

  const userStatus = useAppSelector(getAuthStatus);
  const offerDetails = useAppSelector(getOfferInfo);
  const comments = useAppSelector(getComments);
  const nearbyOffers = useAppSelector(getNearbyOffers).slice(
    0,
    OFFER_MAX_NEARBY
  );

  const {
    images,
    isPremium,
    isFavorite,
    title,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
    city,
  } = offerDetails;

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      Promise.allSettled([
        dispatch(setActiveOffer(id)),
        dispatch(fetchOfferDetails(id)),
        dispatch(fetchComments(id)),
        dispatch(fetchNearbyOffers(id)),
      ]);
    }

    return () => {
      dispatch(setActiveOffer(null));
    };
  }, [id]);

  return (
    <Layout className="page">
      <main className="page__main page__main--offer">
        <section className="offer">
          {/* Галерея фото */}
          {images?.length > 0 && <Gallery images={images} />}

          <div className="offer__container container">
            <div className="offer__wrapper">
              {/* Лейбл премиум */}
              {isPremium && (
                <div className="offer__mark">
                  <span>Premium</span>
                </div>
              )}

              <div className="offer__name-wrapper">
                <h1 className="offer__name">{title}</h1>

                {/* Добавить в избранное */}
                <BookmarkButton
                  bemblock="offer"
                  isFavorite={isFavorite}
                  iconSize={{ width: 31, height: 33 }}
                />
              </div>

              {/* Рейтинг */}
              {rating && <Rating bemblock="offer" rating={rating} />}

              {/* Основные характеристики */}
              {type && (
                <ul className="offer__features">
                  <li className="offer__feature offer__feature--entire">
                    {capitalizeFirstLetter(type)}
                  </li>
                  {bedrooms && (
                    <li className="offer__feature offer__feature--bedrooms">
                      {bedrooms} Bedrooms
                    </li>
                  )}
                  {maxAdults && (
                    <li className="offer__feature offer__feature--adults">
                      Max {maxAdults} adults
                    </li>
                  )}
                </ul>
              )}

              {/* Цена */}
              {price && (
                <div className="offer__price">
                  <b className="offer__price-value">&euro;{price}</b>
                  <span className="offer__price-text">&nbsp;night</span>
                </div>
              )}

              {/* Удобства */}
              {goods?.length > 0 && <Goods goods={goods} />}

              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>

                {/* Хост */}
                {host && <Host host={host} />}

                {/* Описание места */}
                {description && (
                  <div className="offer__description">
                    <p className="offer__text">{description}</p>
                  </div>
                )}
              </div>

              {/* Блок отзывов */}
              <section className="offer__reviews reviews">
                <h2 className="reviews__title">
                  Reviews &middot;{' '}
                  <span className="reviews__amount">
                    {comments?.length ?? 0}
                  </span>
                </h2>

                {/* Отзывы */}
                {comments?.length > 0 && <Comments comments={comments} />}

                {/* Форма отправки отзыва (для авторизованного пользователя) */}
                {userStatus === AuthStatus.Auth && <ReviewForm />}
              </section>
            </div>
          </div>

          {city && nearbyOffers && (
            <Map
              bemblock="offer"
              location={city.location}
              offers={[offerDetails, ...nearbyOffers]}
            />
          )}
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>

            <div className="near-places__list places__list">
              {nearbyOffers.map((item) => (
                <PlaceCard
                  key={item.id}
                  bemblock="near-places"
                  imageSize={{ width: 260, height: 200 }}
                  place={item}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
