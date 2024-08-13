import type { CityConfig } from '@entities/cities';
import type { SortingConfig } from './entities/sorting';

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
export const CITIES: CityConfig[] = [
  {
    slug: '/paris',
    name: 'Paris',
    location: {
      latitude: 48.85661,
      longitude: 2.351499,
      zoom: 13,
    },
  },
  {
    slug: '/cologne',
    name: 'Cologne',
    location: {
      latitude: 50.938361,
      longitude: 6.959974,
      zoom: 13,
    },
  },
  {
    slug: '/brussels',
    name: 'Brussels',
    location: {
      latitude: 50.846557,
      longitude: 4.351697,
      zoom: 13,
    },
  },
  {
    slug: '/amsterdam',
    name: 'Amsterdam',
    location: {
      latitude: 52.37454,
      longitude: 4.897976,
      zoom: 13,
    },
  },
  {
    slug: '/hamburg',
    name: 'Hamburg',
    location: {
      latitude: 53.550341,
      longitude: 10.000654,
      zoom: 13,
    },
  },
  {
    slug: '/dusseldorf',
    name: 'Dusseldorf',
    location: {
      latitude: 51.225402,
      longitude: 6.776314,
      zoom: 13,
    },
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
 * Максимальное количество предложений рядом на странице предложения
 */
export const OFFER_MAX_NEARBY = 3;

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

/**
 * Значения для сортировки
 */
export const SortingOptionValue = {
  Popular: 'POPULAR',
  PriceLowToHigh: 'PRICE_LTH',
  PriceHighToLow: 'PRICE_HTL',
  TopRatedFirst: 'RATING_HTL',
} as const;

/**
 * Конфигурация опций для сортировки
 */
export const SORTING_CONFIG: SortingConfig[] = [
  {
    title: 'Popular',
    value: SortingOptionValue.Popular,
  },
  {
    title: 'Price: low to high',
    value: SortingOptionValue.PriceLowToHigh,
  },
  {
    title: 'Price: high to low',
    value: SortingOptionValue.PriceHighToLow,
  },
  {
    title: 'Top rated first',
    value: SortingOptionValue.TopRatedFirst,
  },
];

export const APIRoute = {
  Offers: '/offers',
} as const;
