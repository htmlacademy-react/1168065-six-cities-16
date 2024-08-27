import { capitalizeFirstLetter, pluralize } from './formatters';

describe('String formatting functions', () => {
  describe('Function: capitalizeFirstLetter', () => {
    it('should return only first capitalized letter for provided string', () => {
      expect(capitalizeFirstLetter('appartment')).toBe('Appartment');
      expect(capitalizeFirstLetter('two bedrooms appartment')).toBe(
        'Two bedrooms appartment'
      );
    });

    it('should return empty string if provided', () => {
      expect(capitalizeFirstLetter('')).toBe('');
    });

    it('should return the provided string if the first symbol is not a letter', () => {
      expect(capitalizeFirstLetter('1string')).toBe('1string');
      expect(capitalizeFirstLetter('!string')).toBe('!string');
      expect(capitalizeFirstLetter(' string')).toBe(' string');
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
