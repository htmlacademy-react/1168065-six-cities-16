import { faker } from '@faker-js/faker';

export function createRandomPlace() {
  return {
    id: faker.string.uuid(),
    title: faker.lorem.text(),
    type: faker.lorem.word(),
    price: faker.number.int({ min: 10, max: 1000 }),
    isFavorite: faker.datatype.boolean(),
    isPremium: faker.datatype.boolean(),
    rating: faker.number.int({ min: 0, max: 5 }),
    previewImage: faker.image.urlLoremFlickr({ category: 'appartment' }),
  };
}

export const places = faker.helpers.multiple(createRandomPlace, { count: 5 });
