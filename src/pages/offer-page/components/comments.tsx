import type { Comment } from '@src/entities/comments';
import Rating from '@src/components/rating/rating';

type CommentsProps = {
  comments: Array<Comment>;
};

/**
 * Компонент списка комментариев
 */
export default function Comments({ comments }: CommentsProps) {
  return (
    <ul className="reviews__list">
      {comments.map((item: Comment) => {
        const { id, date, user, comment, rating } = item;
        const { name, avatarUrl } = user;

        const dateToShow = new Date(date).toLocaleString('en-us', {
          month: 'long',
          year: 'numeric',
        });

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
              <time className="reviews__time" dateTime={date}>
                {dateToShow}
              </time>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
