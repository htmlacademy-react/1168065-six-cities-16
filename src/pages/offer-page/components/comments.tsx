import { Comment } from '@src/entities/comments';
import Rating from '@src/components/rating/rating';
import { convertDateToYYMMDD } from '@src/utils/date-formatter';
import { OFFER_MAX_COMMENTS } from '@src/const';

type CommentsProps = {
  comments: Array<Comment>;
};

/**
 * Компонент списка комментариев
 */
export default function Comments({ comments }: CommentsProps) {
  return (
    <ul className="reviews__list">
      {comments.slice(0, OFFER_MAX_COMMENTS).map((item: Comment) => {
        const { id, date, user, comment, rating } = item;
        const { name, avatarUrl } = user;

        const dateObj = new Date(date);
        const month = dateObj.toLocaleString('en-us', {
          month: 'long',
        });
        const year = dateObj.toLocaleString('default', {
          year: 'numeric',
        });
        const dateTime = convertDateToYYMMDD(dateObj);

        return (
          <li key={id} className="reviews__item">
            {/* Пользователь */}
            <div className="reviews__user user">
              {/* Аватар */}
              <div className="reviews__avatar-wrapper user__avatar-wrapper">
                <img
                  className="reviews__avatar user__avatar"
                  src={avatarUrl}
                  width="54"
                  height="54"
                  alt="Reviews avatar"
                />
              </div>
              {/* Имя */}
              <span className="reviews__user-name">{name}</span>
            </div>

            <div className="reviews__info">
              {/* Рейтинг */}
              <Rating bemblock="reviews" rating={rating} />

              {/* Комментарий */}
              <p className="reviews__text">{comment}</p>

              {/* Дата */}
              <time className="reviews__time" dateTime={dateTime}>
                {month} {year}
              </time>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
