import { AuthStatus, AppRoute } from '@src/const';
import { useAppDispatch, useAppSelector } from '@src/hooks/store-hooks';
import { getAuthStatus } from '@src/store/slices/user-slice';
import { changeFavorite } from '@src/store/thunks/favorites';
import clsx from 'clsx';
import { HTMLAttributes, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type BookmarkButtonProps = HTMLAttributes<HTMLButtonElement> & {
  bemblock: 'place-card' | 'offer';
  isFavorite: boolean;
  iconSize: {
    width: string | number;
    height: string | number;
  };
  offerID: string;
};

/**
 * Компонент кнопки "Добавить в закладки"
 */
export default function BookmarkButton({
  bemblock,
  isFavorite,
  iconSize,
  offerID,
  ...props
}: BookmarkButtonProps) {
  const [isActive, setIsActive] = useState<boolean>(isFavorite);

  const bookmarkClass: string = clsx(
    `${bemblock}__bookmark-button button`,
    isActive && `${bemblock}__bookmark-button--active`
  );

  const userStatus = useAppSelector(getAuthStatus);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleBookmarkClick = () => {
    // если пользователь не авторизован, то перенаправляем на логин
    if (userStatus !== AuthStatus.Auth) {
      navigate(AppRoute.Login);
    }

    // конвертируем для удобства boolean в number для запроса по api
    // в качестве статуса отправляем обратное значение избранного
    dispatch(changeFavorite({ id: offerID, status: Number(!isActive) }));
    setIsActive(!isActive);
  };

  return (
    <button
      className={bookmarkClass}
      type={'button'}
      onClick={handleBookmarkClick}
      {...props}
    >
      <svg className={`${bemblock}__bookmark-icon`} style={{ ...iconSize }}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isActive ? 'In' : 'To'} bookmarks
      </span>
    </button>
  );
}
