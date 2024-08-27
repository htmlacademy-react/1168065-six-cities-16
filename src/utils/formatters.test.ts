import { capitalizeFirstLetter, pluralize } from './formatters';

describe('String formatting functions', () => {
  describe('Function: capitalizeFirstLetter', () => {
    it('should return capitalized first letter for provided string', () => {
      expect(capitalizeFirstLetter('appartment')).toBe('Appartment');
    });
  });

  describe('Function: pluralize', () => {
    it('should return singular form when count is 1', () => {
      expect(pluralize(1, 'offer')).toBe('1 offer');
    });

    it('should return plural form when count is not 1', () => {
      expect(pluralize(0, 'offer')).toBe('0 offers');
      expect(pluralize(2, 'offer')).toBe('2 offers');
    });

    it('should use custom suffix if provided', () => {
      expect(pluralize(2, 'cactus', 'i')).toBe('2 cactusi');
    });
  });
});
