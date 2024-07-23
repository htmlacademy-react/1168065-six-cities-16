import { COMMENT_LENGTH, RATING_CONFIG } from '@src/const';
import { Fragment, useEffect, useState } from 'react';

/**
 * Компонент формы отзыва
 */
export default function ReviewForm() {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [isDisabled, setIsDisabled] = useState<boolean>(true);

  useEffect(() => {
    comment.length > COMMENT_LENGTH.min
      ? setIsDisabled(false)
      : setIsDisabled(true);
  }, [comment]);

  return (
    <form className="reviews__form form" action="#" method="post">
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATING_CONFIG.map(({ id, title, value }) => {
          return (
            <Fragment key={id}>
              <input
                className="form__rating-input visually-hidden"
                name="rating"
                value={value}
                id={id}
                type="radio"
                onChange={(evt) => setRating(parseInt(evt.target.value))}
              />
              <label
                htmlFor={id}
                className="reviews__rating-label form__rating-label"
                title={title}
              >
                <svg className="form__star-image" width="37" height="33">
                  <use xlinkHref="#icon-star"></use>
                </svg>
              </label>
            </Fragment>
          );
        })}
      </div>

      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        minLength={COMMENT_LENGTH.min}
        maxLength={COMMENT_LENGTH.max}
        value={comment}
        onChange={(evt) => {
          if (evt.target.value.length > COMMENT_LENGTH.max) {
            return;
          }

          setComment(evt.target.value);
        }}
      ></textarea>

      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{' '}
          <span className="reviews__star">rating</span> and describe your stay
          with at least{' '}
          <b className="reviews__text-amount">
            {COMMENT_LENGTH.min} characters
          </b>
          .
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={isDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
