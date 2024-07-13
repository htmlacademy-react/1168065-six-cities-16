import { CITIES } from '@src/const';
import { NavLink } from 'react-router-dom';
import { CityRoute } from '@entities/cities';
import clsx from 'clsx';

/**
 * Элемент навигации
 */
function LocationItem({ slug, name }: CityRoute) {
  return (
    <li className="locations__item">
      <NavLink
        className={({ isActive }) =>
          clsx(
            'locations__item-link tabs__item',
            isActive && 'tabs__item--active'
          )
        }
        to={slug}
      >
        <span>{name}</span>
      </NavLink>
    </li>
  );
}

type LocationListProps = {
  locations: CityRoute[];
};

/**
 * Список навигации
 */
function LocationList({ locations }: LocationListProps) {
  return (
    <ul className="locations__list tabs__list">
      {locations.map((city: CityRoute) => (
        <LocationItem key={city.name} {...city} />
      ))}
    </ul>
  );
}

/**
 * Компонент навигации по городам
 * @returns {JSX.Element}
 */
export default function Navigation(): JSX.Element {
  return (
    <div className="tabs">
      <section className="locations container">
        <LocationList locations={CITIES} />
      </section>
    </div>
  );
}
