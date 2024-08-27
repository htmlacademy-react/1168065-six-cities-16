import { getRandomElement } from './get-random-element';

describe('Function: getRandomElement', () => {
  it('should return a random element from an array', () => {
    const array = [1, 2, 3, 4, 5, 6];

    const randomElement = getRandomElement(array);

    expect(array).toContain(randomElement);
  });
});
