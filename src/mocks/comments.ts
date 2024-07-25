import type { Comment } from '@src/entities/comments';

export const comments: Comment[] = [
  {
    id: '1a043721-c2e2-4876-a8ba-6a47f09c42ef',
    comment:
      'The deluxe room was a quite comfortable one with all the adequate facilities. The only thing that made me feel uncomfortable was the rude behavior of an impolite staff at the reception desk.',
    date: '2024-06-30T10:05:47.083Z',
    rating: 2,
    user: {
      name: 'Isaac',
      avatarUrl: 'https://16.design.htmlacademy.pro/static/avatar/3.jpg',
      isPro: true,
    },
  },
  {
    id: '6f96129f-e100-4e7e-9ba0-0074d5b44c2e',
    comment: 'I stayed here for one night and it was an unpleasant experience.',
    date: '2024-06-28T10:05:47.083Z',
    rating: 1,
    user: {
      name: 'Mollie',
      avatarUrl: 'https://16.design.htmlacademy.pro/static/avatar/2.jpg',
      isPro: false,
    },
  },
  {
    id: '530aa7fa-67b2-47f2-b781-12b3f3374ac4',
    comment:
      'Home is amazing. It\'s like staying in a museum. The rooms, furnishings and artworks are incredible. The views of My Vesuvius',
    date: '2024-06-27T10:05:47.083Z',
    rating: 3,
    user: {
      name: 'Emely',
      avatarUrl: 'https://16.design.htmlacademy.pro/static/avatar/6.jpg',
      isPro: false,
    },
  },
];
