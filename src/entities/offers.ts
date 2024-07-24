type Location = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export interface Offer {
  id: string;
  title: string;
  type: string;
  price: number;
  city: {
    name: string;
    location: Location;
  };
  location: Location;
  isFavorite: boolean;
  isPremium: boolean;
  rating: number;
  previewImage: string;
}

export type OffersByCity = {
  // Как сделать, чтобы ключом был именно city.name? Или можно оставить и так?
  [key: string]: Offer[] | undefined;
};

export type Place = Omit<Offer, 'location' | 'city'>;

export type OfferDetailed = Omit<Offer, 'previewImage'> & {
  description: string;
  bedrooms: number;
  goods: string[];
  host: {
    name: string;
    avatarUrl: string;
    isPro: boolean;
  };
  images: string[];
  maxAdults: number;
};
