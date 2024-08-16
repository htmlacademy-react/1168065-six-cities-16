import Layout from '@components/layout/layout';
import { AppRoute } from '@src/const';
import type { AuthData } from '@src/entities/auth';
import { useAppDispatch } from '@src/hooks/store-hooks';
import { loginUser } from '@src/store/thunks/user';

import { useRef, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';

/**
 * Страница логина
 */
export default function LoginPage(): JSX.Element {
  const formRef = useRef<HTMLFormElement>(null);
  const dispatch = useAppDispatch();

  /**
   * Обработчик отправки формы
   */
  const handleSubmit = (evt: FormEvent): void => {
    evt.preventDefault();

    if (formRef.current) {
      const formData = Object.fromEntries(
        new FormData(formRef.current)
      ) as AuthData;

      dispatch(loginUser(formData));
    }
  };

  /**
   * Обработчик ввода пароля
   */
  const handlePasswordInput = (evt: ChangeEvent<HTMLInputElement>) => {
    evt.target.value = evt.target.value.replace(/\s/g, '');
  };

  return (
    <Layout
      className="page page--gray page--login"
      headerProps={{ withNav: false }}
    >
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              ref={formRef}
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  pattern="/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  pattern="^(?=.*[a-zA-Z])(?=.*\d).+$"
                  onChange={handlePasswordInput}
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link to={AppRoute.Main} className="locations__item-link">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </Layout>
  );
}
