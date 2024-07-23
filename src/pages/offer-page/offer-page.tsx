import Layout from '@components/layout/layout';
import BookmarkButton from '@src/components/bookmark-button/bookmark-button';
import Rating from '@src/components/rating/rating';
import { AuthStatus } from '@src/const';
import { Comment } from '@src/entities/comments';
import { comments } from '@src/mocks/comments';
import { singleOffer } from '@src/mocks/single-offer';
import { convertDateToYYMMDD } from '@src/utils/date-formatter';
import Gallery from './components/gallery';
import Goods from './components/goods';
import Host from './components/host';
import Comments from './components/comments';
import ReviewForm from './components/review-form';

type OfferPageProps = {
  userStatus: string;
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
                  {type.charAt(0).toUpperCase() + type.slice(1)}
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

          <section className="offer__map map"></section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <article className="near-places__card place-card">
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img
                      className="place-card__image"
                      src="img/room.jpg"
                      width="260"
                      height="200"
                      alt="Place image"
                    />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">&euro;80</b>
                      <span className="place-card__price-text">
                        &#47;&nbsp;night
                      </span>
                    </div>
                    <button
                      className="place-card__bookmark-button place-card__bookmark-button--active button"
                      type="button"
                    >
                      <svg
                        className="place-card__bookmark-icon"
                        width="18"
                        height="19"
                      >
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">In bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{ width: '80%' }}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Wood and stone place</a>
                  </h2>
                  <p className="place-card__type">Room</p>
                </div>
              </article>

              <article className="near-places__card place-card">
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img
                      className="place-card__image"
                      src="img/apartment-02.jpg"
                      width="260"
                      height="200"
                      alt="Place image"
                    />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">&euro;132</b>
                      <span className="place-card__price-text">
                        &#47;&nbsp;night
                      </span>
                    </div>
                    <button
                      className="place-card__bookmark-button button"
                      type="button"
                    >
                      <svg
                        className="place-card__bookmark-icon"
                        width="18"
                        height="19"
                      >
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{ width: '80%' }}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Canal View Prinsengracht</a>
                  </h2>
                  <p className="place-card__type">Apartment</p>
                </div>
              </article>

              <article className="near-places__card place-card">
                <div className="place-card__mark">
                  <span>Premium</span>
                </div>
                <div className="near-places__image-wrapper place-card__image-wrapper">
                  <a href="#">
                    <img
                      className="place-card__image"
                      src="img/apartment-03.jpg"
                      width="260"
                      height="200"
                      alt="Place image"
                    />
                  </a>
                </div>
                <div className="place-card__info">
                  <div className="place-card__price-wrapper">
                    <div className="place-card__price">
                      <b className="place-card__price-value">&euro;180</b>
                      <span className="place-card__price-text">
                        &#47;&nbsp;night
                      </span>
                    </div>
                    <button
                      className="place-card__bookmark-button button"
                      type="button"
                    >
                      <svg
                        className="place-card__bookmark-icon"
                        width="18"
                        height="19"
                      >
                        <use xlinkHref="#icon-bookmark"></use>
                      </svg>
                      <span className="visually-hidden">To bookmarks</span>
                    </button>
                  </div>
                  <div className="place-card__rating rating">
                    <div className="place-card__stars rating__stars">
                      <span style={{ width: '100%' }}></span>
                      <span className="visually-hidden">Rating</span>
                    </div>
                  </div>
                  <h2 className="place-card__name">
                    <a href="#">Nice, cozy, warm big bed apartment</a>
                  </h2>
                  <p className="place-card__type">Apartment</p>
                </div>
              </article>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
