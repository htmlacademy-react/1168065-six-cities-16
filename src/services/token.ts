const AUTH_TOKEN_KEY_NAME = 'six-cities-token';

/**
 * Токен пользователя
 */
export type Token = string;

/**
 * Получить токен пользователя из localStorage
 */
export const getToken = (): Token => {
  const token = localStorage.getItem(AUTH_TOKEN_KEY_NAME);

  return token ?? '';
};

/**
 * Записать токен пользователя в localStorage
 */
export const setToken = (token: Token): void => {
  localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
};

/**
 * Удалить токен пользователя из localStorage
 */
export const removeToken = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY_NAME);
};
