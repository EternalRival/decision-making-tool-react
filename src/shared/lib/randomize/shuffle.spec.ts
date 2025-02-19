import { describe, expect, it, vi } from 'vitest';
import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('returns array of same length', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffle(array);

    expect(shuffled).toHaveLength(array.length);
  });

  it('contains all original elements', () => {
    const array = [1, 2, 3, 4, 5];
    const shuffled = shuffle(array);

    expect(shuffled.sort()).toEqual(array.sort());
  });

  it('handles empty array', () => {
    expect(shuffle([])).toEqual([]);
  });

  it('handles single-element array', () => {
    expect(shuffle([42])).toEqual([42]);
  });

  it('does not mutate original array', () => {
    const array = [1, 2, 3, 4, 5];
    const snapshot = structuredClone(array);

    shuffle(array);
    expect(array).toEqual(snapshot);
  });

  it('produces predictable shuffle with mocked random', () => {
    const mockMath = vi.spyOn(globalThis.Math, 'random');

    mockMath.mockReturnValue(0);

    expect(shuffle([3, 1, 2, 4, 5])).toEqual([1, 2, 4, 5, 3]);

    mockMath.mockReturnValue(0.9);

    expect(shuffle([3, 1, 2, 4, 5])).toEqual([3, 1, 2, 4, 5]);

    mockMath.mockClear();
  });

  it('throws error for undefined elements', () => {
    expect(() => shuffle([1, undefined, 3])).toThrow('a or b is undefined');
  });
});
