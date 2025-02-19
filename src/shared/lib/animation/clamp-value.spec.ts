import { it, expect, describe } from 'vitest';
import { clampValue } from './clamp-value';

describe('clampValue', () => {
  it('returns current value when within [min, max]', () => {
    expect(clampValue(1, 2, 3)).toBe(2);
    expect(clampValue(-5, 0, 5)).toBe(0);
    expect(clampValue(10, 15, 20)).toBe(15);
  });

  it('returns min when current < min', () => {
    expect(clampValue(5, 3, 10)).toBe(5);
    expect(clampValue(-2, -5, 0)).toBe(-2);
    expect(clampValue(0, -1, 5)).toBe(0);
  });

  it('returns max when current > max', () => {
    expect(clampValue(5, 12, 10)).toBe(10);
    expect(clampValue(-10, 5, 0)).toBe(0);
    expect(clampValue(3, 5, 4)).toBe(4);
  });

  it('handles edge cases (current = min or max)', () => {
    expect(clampValue(5, 5, 10)).toBe(5);
    expect(clampValue(5, 10, 10)).toBe(10);
    expect(clampValue(0, 0, 0)).toBe(0);
  });

  it('throws error when min > max', () => {
    expect(() => clampValue(10, 5, 5)).toThrow('min must be less than or equal to max');
    expect(() => clampValue(8, 5, 3)).toThrow('min must be less than or equal to max');
    expect(() => clampValue(5, 10, 3)).toThrow('min must be less than or equal to max');
  });

  it('handles negative ranges', () => {
    expect(clampValue(-15, -10, -5)).toBe(-10);
    expect(clampValue(-20, -25, -10)).toBe(-20);
    expect(clampValue(-5, 3, 0)).toBe(0);
  });

  it('handles same min and max', () => {
    expect(clampValue(5, 5, 5)).toBe(5);
    expect(clampValue(5, 10, 5)).toBe(5);
    expect(clampValue(5, 3, 5)).toBe(5);
  });
});
