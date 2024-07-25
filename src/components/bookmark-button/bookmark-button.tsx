import clsx from 'clsx';

type BookmarkButtonProps = {
  bemblock: string;
  isFavorite: boolean;
  iconSize: {
    width: string | number;
    height: string | number;
  };
};

/**
 * Компонент кнопки "Добавить в закладки"
 */
export default function BookmarkButton({
  bemblock,
  isFavorite,
  iconSize,
}: BookmarkButtonProps) {
  const bookmarkClass: string = clsx(
    `${bemblock}__bookmark-button button`,
    isFavorite && `${bemblock}__bookmark-button--active`
  );

  return (
    <button className={bookmarkClass} type="button">
      <svg className={`${bemblock}__bookmark-icon`} style={{ ...iconSize }}>
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isFavorite ? 'In' : 'To'} bookmarks
      </span>
    </button>
  );
}
