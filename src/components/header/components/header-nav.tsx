import { AppRoute, AuthStatus } from '@src/const';
import { useAppSelector } from '@src/hooks/store-hooks';
import { getAuthStatus } from '@src/store/slices/user-slice';
import { Link } from 'react-router-dom';

/**
 * Пользовательская навигация
 */
export default function HeaderNav() {
  const userStatus = useAppSelector(getAuthStatus);

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {userStatus === AuthStatus.Auth && (
          <>
            <li className="header__nav-item user">
              <Link
                className="header__nav-link header__nav-link--profile"
                to={AppRoute.Favourites}
              >
                <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                <span className="header__user-name user__name">
                  Oliver.conner@gmail.com
                </span>
                <span className="header__favorite-count">3</span>
              </Link>
            </li>
            <li className="header__nav-item">
              <a className="header__nav-link" href="#">
                <span className="header__signout">Sign out</span>
              </a>
            </li>
          </>
        )}

        {(userStatus === AuthStatus.NoAuth ||
          userStatus === AuthStatus.Unknown) && (
          <li className="header__nav-item user">
            <Link
              to={AppRoute.Login}
              className="header__nav-link header__nav-link--profile"
            >
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
