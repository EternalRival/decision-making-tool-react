import { describe, expect, it } from 'vitest';
import { getRandomNumber } from './get-random-number';

describe('getRandomNumber', () => {
  it('returns number within [min, max] range', () => {
    const min = 1;
    const max = 5;

    for (let i = 0; i < 1000; i++) {
      const result = getRandomNumber(min, max);

      expect(result).toBeGreaterThanOrEqual(min);
      expect(result).toBeLessThanOrEqual(max);
    }
  });

  it('returns integer when min and max are integers', () => {
    const result = getRandomNumber(1, 10);

    expect(Number.isInteger(result)).toBe(true);
  });

  it('returns min when min === max', () => {
    expect(getRandomNumber(5, 5)).toBe(5);
  });

  it('works with negative numbers', () => {
    const result = getRandomNumber(-5, -1);

    expect(result).toBeGreaterThanOrEqual(-5);
    expect(result).toBeLessThanOrEqual(-1);
  });

  it('throws error when min > max', () => {
    expect(() => getRandomNumber(5, 1)).toThrow('min must be less than or equal to max');
  });

  it('covers all values in small range', () => {
    const values = new Set();

    for (let i = 0; i < 100; i++) {
      values.add(getRandomNumber(1, 3));
    }

    expect(values).toEqual(new Set([1, 2, 3]));
  });
});
