export default function PlaceCard(): JSX.Element {
  return (
    <article className="cities__card place-card">
      {/* Лейбл "премиум" */}
      <div className="place-card__mark">
        <span>Premium</span>
      </div>

      {/* Изображение */}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src="img/apartment-01.jpg"
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
            <b className="place-card__price-value">&euro;120</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          {/* Добавление в закладки, активный класс place-card__bookmark-button--active */}
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            {/* Текст меняется для доступности */}
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>

        {/* Рейтинг */}
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            {/* Количество звезд завязано на параметр width */}
            <span style={{ width: '80%' }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        {/* Название и тип */}
        <h2 className="place-card__name">
          <a href="#">Beautiful &amp; luxurious apartment at great location</a>
        </h2>
        <p className="place-card__type">Apartment</p>
      </div>
    </article>
  );
}
