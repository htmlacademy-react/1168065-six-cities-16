import { COMMENT_LENGTH, RATING_CONFIG } from '@src/const';
import { type FormEvent, Fragment, useState } from 'react';

/**
 * Компонент формы отзыва
 */
export default function ReviewForm() {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('');

  const validateForm = () =>
    rating &&
    comment.length >= COMMENT_LENGTH.min &&
    comment.length <= COMMENT_LENGTH.max;

  const isDisabled = !validateForm();

  const formSubmitHandler = (evt: FormEvent) => {
    evt.preventDefault();

    const formData = { rating, comment };

    // Добавил временный вывод в консоль
    // eslint-disable-next-line no-console
    console.log(formData);
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={formSubmitHandler}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {RATING_CONFIG.map(({ id, title, value }) => (
          <Fragment key={id}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={id}
              type="radio"
              onChange={(evt) =>
                setRating(Number.parseInt(evt.target.value, 10))}
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
        ))}
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
          setComment(evt.target.value);
        }}
      />

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
