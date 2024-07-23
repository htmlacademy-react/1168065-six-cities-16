import { CityRoute } from '@entities/cities';

/**
 * Роут приложения
 */
export const enum AppRoute {
  Main = '/',
  Favourites = '/favourites',
  Login = '/login',
  Offer = '/offer',
}

/**
 * Статус авторизации
 */
export const enum AuthStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

/**
 * Конфигурация городов
 */
export const CITIES: Array<CityRoute> = [
  {
    slug: '/paris',
    name: 'Paris',
  },
  {
    slug: '/cologne',
    name: 'Cologne',
  },
  {
    slug: '/brussels',
    name: 'Brussels',
  },
  {
    slug: '/amsterdam',
    name: 'Amsterdam',
  },
  {
    slug: '/hamburg',
    name: 'Hamburg',
  },
  {
    slug: '/dusseldorf',
    name: 'Dusseldorf',
  },
];

/**
 * Максимальное количество изображений на странице предложения
 */
export const OFFER_MAX_IMAGES = 6;

/**
 * Максимальное количество комментариев на странице предложения
 */
export const OFFER_MAX_COMMENTS = 10;

/**
 * Длина комментария для отправки отзыва
 */
export const COMMENT_LENGTH = {
  min: 50,
  max: 300,
};

/**
 * Конфигурация выбора оценки
 */
export const RATING_CONFIG = [
  {
    id: '5-stars',
    value: 5,
    title: 'perfect',
  },
  {
    id: '4-stars',
    value: 4,
    title: 'good',
  },
  {
    id: '3-stars',
    value: 3,
    title: 'not bad',
  },
  {
    id: '2-stars',
    value: 2,
    title: 'badly',
  },
  {
    id: '1-star',
    value: 1,
    title: 'terribly',
  },
];
