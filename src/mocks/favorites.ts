import type { Offer } from '@src/entities/offers';

export const Favorites: Offer[] = [
  {
    id: '4af11f9d-bee3-4d3a-8bfd-bd48be5300d2',
    title: 'The Joshua Tree House',
    type: 'room',
    price: 284,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/5.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.868610000000004,
      longitude: 2.342499,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 3.9,
  },
  {
    id: '799dc7b6-dec2-49b4-8d1c-fe636bb92f1a',
    title: 'Amazing and Extremely Central Flat',
    type: 'house',
    price: 113,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/10.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.834610000000005,
      longitude: 2.335499,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: true,
    rating: 2,
  },
  {
    id: 'e6cf52f9-70dd-4ada-8249-475b2fe6a8ed',
    title: 'House in countryside',
    type: 'apartment',
    price: 481,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/3.jpg',
    city: {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    },
    location: {
      latitude: 48.87561,
      longitude: 2.375499,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 3.2,
  },
  {
    id: '93db26ce-ed47-4129-8bd0-aad660ed05f3',
    title: 'The Joshua Tree House',
    type: 'hotel',
    price: 481,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/3.jpg',
    city: {
      name: 'Brussels',
      location: {
        latitude: 50.846557,
        longitude: 4.351697,
        zoom: 13,
      },
    },
    location: {
      latitude: 50.854557,
      longitude: 4.364697,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 2,
  },
  {
    id: '9834533c-6784-45eb-a202-85018c6351b7',
    title: 'Penthouse, 4-5 rooms + 5 balconies',
    type: 'hotel',
    price: 269,
    previewImage: 'https://16.design.htmlacademy.pro/static/hotel/20.jpg',
    city: {
      name: 'Amsterdam',
      location: {
        latitude: 52.37454,
        longitude: 4.897976,
        zoom: 13,
      },
    },
    location: {
      latitude: 52.36554,
      longitude: 4.911976,
      zoom: 16,
    },
    isFavorite: true,
    isPremium: false,
    rating: 1.5,
  },
];
