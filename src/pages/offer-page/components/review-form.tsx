import { COMMENT_LENGTH, RATING_CONFIG } from '@src/const';
import { useAppDispatch, useAppSelector } from '@src/hooks/store-hooks';
import { getCommentSubmitStatus } from '@src/store/slices/comments-slice';
import { postComment } from '@src/store/thunks/comments';
import { type FormEvent, Fragment, useRef, useState } from 'react';
import { toast } from 'react-toastify';

type ReviewFormProps = {
  offerID: string;
};

const INITIAL_RATING = 0;
const INITIAL_COMMENT = '';

/**
 * Компонент формы отзыва
 */
export default function ReviewForm({ offerID }: ReviewFormProps) {
  const [rating, setRating] = useState<number>(INITIAL_RATING);
  const [comment, setComment] = useState<string>(INITIAL_COMMENT);

  const formRef = useRef<HTMLFormElement>(null);

  const submitStatus = useAppSelector(getCommentSubmitStatus);
  const dispatch = useAppDispatch();

  const validateForm = () =>
    Boolean(
      rating &&
        comment.length >= COMMENT_LENGTH.min &&
        comment.length <= COMMENT_LENGTH.max
    );

  const isSubmitting = submitStatus === true;
  const isSubmitDisabled = !validateForm() || isSubmitting;

  const formSubmitHandler = (evt: FormEvent) => {
    evt.preventDefault();

    const formData = { rating, comment };

    dispatch(postComment({ offerID, ...formData }))
      .unwrap()
      .then(() => {
        toast.success('Your review has been added successfully');
        formRef.current?.reset();
        setRating(INITIAL_RATING);
        setComment(INITIAL_COMMENT);
      })
      .catch(() => toast.error('An error occured'));
  };

  return (
    <form
      ref={formRef}
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
              defaultValue={value}
              checked={value === rating}
              id={id}
              type="radio"
              disabled={isSubmitting}
              onChange={(evt) =>
                setRating(Number.parseInt(evt.target.value, 10))
              }
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
        value={comment}
        disabled={isSubmitting}
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
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
