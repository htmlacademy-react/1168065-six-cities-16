import Layout from '@components/layout/layout';
import BookmarkButton from '@src/components/bookmark-button/bookmark-button';
import Rating from '@src/components/rating/rating';
import { AuthStatus, OFFER_MAX_NEARBY } from '@src/const';
import { comments } from '@src/mocks/comments';
import { singleOffer } from '@src/mocks/single-offer';
import Gallery from './components/gallery';
import Goods from './components/goods';
import Host from './components/host';
import Comments from './components/comments';
import ReviewForm from './components/review-form';
import { offers } from '@src/mocks/offers';
import PlaceCard from '@src/components/place-card/place-card';
import { capitalizeFirstLetter } from '@src/utils/capitalizeFirstLetter';
import Map from '@src/components/map/map';

type OfferPageProps = {
  userStatus: AuthStatus;
};

/**
 * Страница предложения
 */
export default function OfferPage({ userStatus }: OfferPageProps): JSX.Element {
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
  } = singleOffer;

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

              {/* Цена */}
              <div className="offer__price">
                <b className="offer__price-value">&euro;{price}</b>
                <span className="offer__price-text">&nbsp;night</span>
              </div>

              {/* Удобства */}
              {goods?.length > 0 && <Goods goods={goods} />}

              <div className="offer__host">
                <h2 className="offer__host-title">Meet the host</h2>

                {/* Хост */}
                <Host host={host} />

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
                    {comments.length ?? 0}
                  </span>
                </h2>

                {/* Отзывы */}
                {comments?.length > 0 && <Comments comments={comments} />}

                {/* Форма отправки отзыва (для авторизованного пользователя) */}
                {userStatus === AuthStatus.Auth && <ReviewForm />}
              </section>
            </div>
          </div>

          <Map bemblock="offer" />
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>

            <div className="near-places__list places__list">
              {offers.slice(0, OFFER_MAX_NEARBY).map((item) => (
                <PlaceCard
                  key={item.id}
                  bemblock="near-places"
                  imageSize={{ width: 260, height: 200 }}
                  {...item}
                />
              ))}
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
