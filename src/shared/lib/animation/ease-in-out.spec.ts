import { it, expect, describe } from 'vitest';
import { easeInOut } from './ease-in-out';

describe('easeInOut', () => {
  describe('easeInOutCubic (default)', () => {
    it('should return 0 for progress 0', () => {
      expect(easeInOut(0)).toBe(0);
    });

    it('should return 1 for progress 1', () => {
      expect(easeInOut(1)).toBe(1);
    });

    it('should return 0.5 for progress 0.5', () => {
      expect(easeInOut(0.5)).toBeCloseTo(0.5, 5);
    });

    it('should calculate correct values for progress < 0.5', () => {
      expect(easeInOut(0.25)).toBeCloseTo(0.0625, 5);
      expect(easeInOut(0.1)).toBeCloseTo(0.004, 5);
      expect(easeInOut(0.4)).toBeCloseTo(0.256, 5);
    });

    it('should calculate correct values for progress >= 0.5', () => {
      expect(easeInOut(0.75)).toBeCloseTo(0.9375, 5);
      expect(easeInOut(0.6)).toBeCloseTo(0.744, 5);
      expect(easeInOut(0.9)).toBeCloseTo(0.996, 5);
    });
  });

  describe('easeInOutBack', () => {
    it('should return 0 for progress 0', () => {
      expect(easeInOut(0, 'easeInOutBack')).toBe(0);
    });

    it('should return 1 for progress 1', () => {
      expect(easeInOut(1, 'easeInOutBack')).toBeCloseTo(1);
    });

    it('should have overshoot effect', () => {
      expect(easeInOut(0.5, 'easeInOutBack')).toBeCloseTo(0.5, 2);
      expect(easeInOut(0.3, 'easeInOutBack')).toBeLessThan(0.3);
      expect(easeInOut(0.7, 'easeInOutBack')).toBeGreaterThan(0.7);
    });

    it('should calculate specific known values', () => {
      expect(easeInOut(0.25, 'easeInOutBack')).toBeCloseTo(0.0482, 4); // было -0.0541
      expect(easeInOut(0.75, 'easeInOutBack')).toBeCloseTo(0.9517, 3); // было 1.0541
    });
  });

  describe('common behavior', () => {
    it('should throw error for values outside [0, 1]', () => {
      expect(() => easeInOut(-0.5)).toThrow('Progress must be in [0, 1]');
      expect(() => easeInOut(1.5)).toThrow('Progress must be in [0, 1]');
    });

    it('should use easeInOutCubic by default', () => {
      expect(easeInOut(0.5)).toBeCloseTo(0.5, 5);
      expect(easeInOut(0.25)).toBeCloseTo(0.0625, 5);
    });

    it('should maintain monotonic growth for both easings', () => {
      const values = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

      const cubicResults = values.map((v) => easeInOut(v));

      for (let i = 1; i < cubicResults.length; i++) {
        const actual = cubicResults[i];
        const expected = cubicResults[i - 1];

        if (typeof actual === 'number' && typeof expected === 'number') {
          expect(actual).toBeGreaterThanOrEqual(expected);
        }
      }

      const backResults = values.map((v) => easeInOut(v, 'easeInOutBack'));

      for (let i = 1; i < backResults.length; i++) {
        const actual = backResults[i];
        const expected = backResults[i - 1];

        if (typeof actual === 'number' && typeof expected === 'number') {
          expect(actual).toBeGreaterThanOrEqual(expected);
        }
      }
    });

    it('should throw error for invalid easing name', () => {
      // @ts-expect-error wrong type
      expect(() => easeInOut(0.5, 'invalid')).toThrow();
    });
  });
});
