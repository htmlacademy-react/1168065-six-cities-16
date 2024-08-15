import { AppRoute } from '@src/const';
import type { Offer } from '@src/entities/offers';
import type { HTMLProps } from 'react';
import { Link } from 'react-router-dom';
import BookmarkButton from '../bookmark-button/bookmark-button';
import Rating from '../rating/rating';
import { capitalizeFirstLetter } from '@src/utils/formatters';

type PlaceCard = HTMLProps<HTMLElement> & {
  place: Omit<Offer, 'city'>;
  bemblock: string;
  imageSize: {
    width: number | string;
    height: number | string;
  };
};

/**
 * Карточка объявления
 */
export default function PlaceCard(props: PlaceCard): JSX.Element {
  const { place, bemblock, imageSize, ...htmlProps } = props;

  const {
    id,
    title,
    type,
    price,
    isFavorite,
    isPremium,
    rating,
    previewImage,
  } = place;

  return (
    <article className={`${bemblock}__card place-card`} {...htmlProps}>
      {/* Лейбл "премиум" */}
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      {/* Изображение */}
      <div className={`${bemblock}__image-wrapper place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            style={{ ...imageSize }}
            alt="Place image"
          />
        </Link>
      </div>

      {/* Основная информация */}
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>

          {/* Добавление в закладки */}
          <BookmarkButton
            bemblock="place-card"
            isFavorite={isFavorite}
            iconSize={{ width: 18, height: 19 }}
          />
        </div>

        {/* Рейтинг */}
        <Rating bemblock="place-card" rating={rating} />

        {/* Название и тип */}
        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{capitalizeFirstLetter(type)}</p>
      </div>
    </article>
  );
}
