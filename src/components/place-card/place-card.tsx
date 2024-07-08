import clsx from 'clsx';

type PlaceCard = {
  // id: string;
  title: string;
  type: string;
  price: number;
  // city: {
  //   name: string;
  //   location: {
  //     latitude: number;
  //     longitude: number;
  //     zoom: number;
  //   };
  // };
  // location: {
  //   latitude: number;
  //   longitude: number;
  //   zoom: number;
  // };
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
};

export default function PlaceCard(props: PlaceCard): JSX.Element {
  const { title, type, price, isFavorite, isPremium, rating, previewImage } =
    props;

  const bookmarkClass = clsx(
    isFavorite && 'place-card__bookmark-button--active'
  );

  return (
    <article className="cities__card place-card">
      {/* Лейбл "премиум" */}
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      {/* Изображение */}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>

      {/* Основная информация */}
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          {/* Добавление в закладки, активный класс place-card__bookmark-button--active */}
          <button
            className={`place-card__bookmark-button button ${bookmarkClass}`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            {/* Текст меняется для доступности */}
            <span className="visually-hidden">
              {isFavorite ? 'In' : 'To'} bookmarks
            </span>
          </button>
        </div>

        {/* Рейтинг */}
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            {/* Количество звезд завязано на параметр width с шагом 20% */}
            <span style={{ width: `${rating * 20}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        {/* Название и тип */}
        <h2 className="place-card__name">
          <a href="#">{title}</a>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
