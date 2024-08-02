import type { Location } from './offers';
/**
 * Тип конфигурации города для маршрутизации
 */
export type CityConfig = {
  slug: string;
  name: string;
  location: Location;
};
