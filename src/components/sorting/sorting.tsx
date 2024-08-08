import { useState } from 'react';
import { SORTING_CONFIG } from '@src/const';
import clsx from 'clsx';
import { useAppDispatch, useAppSelector } from '@src/hooks/store-hooks';
import {
  setActiveSorting,
  sortingSelector,
} from '@src/store/slices/sorting-slice';

export default function Sorting(): JSX.Element {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const activeSorting = useAppSelector(sortingSelector);
  const dispatch = useAppDispatch();

  const optionListClasses = clsx(
    'places__options places__options--custom',
    isOpen && 'places__options--opened'
  );

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>{' '}
      {/* Выбранное значение сортировки */}
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={() => setIsOpen(!isOpen)}
      >
        {activeSorting.title}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {/* Список с опциями сортировки, активный класс places__options--opened */}
      <ul className={optionListClasses}>
        {SORTING_CONFIG.map((item) => {
          const { title, value } = item;
          const optionClasses = clsx(
            'places__option',
            value === activeSorting.value && 'places__option--active'
          );

          return (
            <li
              key={value}
              className={optionClasses}
              tabIndex={0}
              onClick={() => {
                setIsOpen(false);
                dispatch(setActiveSorting(item));
              }}
            >
              {title}
            </li>
          );
        })}
      </ul>
    </form>
  );
}
