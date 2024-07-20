import { faker } from '@faker-js/faker';
import { Place } from '@src/entities/offers';

export function createRandomPlace(): Place {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.words({ min: 1, max: 10 }),
    type: faker.lorem.word(),
    price: faker.number.int({ min: 10, max: 1000 }),
    isFavorite: faker.datatype.boolean(),
    isPremium: faker.datatype.boolean(),
    rating: faker.number.int({ min: 0, max: 5 }),
    previewImage: faker.image.urlLoremFlickr({ category: 'cats' }),
  };
}

export const places = faker.helpers.multiple(createRandomPlace, { count: 5 });
