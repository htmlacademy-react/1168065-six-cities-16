import { AppRoute, AuthStatus } from '@src/const';
import { useAppDispatch, useAppSelector } from '@src/hooks/store-hooks';
import { getFavorites } from '@src/store/slices/favorites-slice';
import { getAuthStatus, getUserData } from '@src/store/slices/user-slice';
import { logoutUser } from '@src/store/thunks/user';
import { Link } from 'react-router-dom';

/**
 * Пользовательская навигация
 */
export default function HeaderNav() {
  const userStatus = useAppSelector(getAuthStatus);
  const { email } = useAppSelector(getUserData);
  const favorites = useAppSelector(getFavorites);
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <nav className="header__nav">
      <ul className="header__nav-list">
        {userStatus === AuthStatus.Auth && (
          <>
            <li className="header__nav-item user">
              <Link
                className="header__nav-link header__nav-link--profile"
                to={AppRoute.Favorites}
              >
                <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                <span className="header__user-name user__name">{email}</span>
                <span className="header__favorite-count">
                  {favorites.length}
                </span>
              </Link>
            </li>
            <li className="header__nav-item">
              <a className="header__nav-link" onClick={handleLogout}>
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
