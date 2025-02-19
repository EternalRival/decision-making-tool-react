import { describe, expect, it, vi } from 'vitest';
import { getRandomColor } from './get-random-color';

describe('getRandomColor', () => {
  it('returns a valid HEX color', () => {
    const color = getRandomColor();

    expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
  });

  it('returns color within valid range', () => {
    for (let i = 0; i < 1000; i++) {
      const color = getRandomColor();
      const hexValue = Number.parseInt(color.slice(1), 16);

      expect(hexValue).toBeGreaterThanOrEqual(0);
      expect(hexValue).toBeLessThanOrEqual(0xffffff);
    }
  });

  it('handles edge cases correctly', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0);
    expect(getRandomColor()).toBe('#000000');

    vi.spyOn(Math, 'random').mockReturnValue(0.99999999);
    expect(getRandomColor()).toBe('#ffffff');

    vi.spyOn(Math, 'random').mockRestore();
  });

  it('generates different colors', () => {
    const colors = new Set();

    for (let i = 0; i < 100; i++) {
      colors.add(getRandomColor());
    }

    expect(colors.size).toBeGreaterThan(1);
  });

  it('correctly converts number to HEX', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5);
    expect(getRandomColor()).toBe('#800000');
    vi.spyOn(Math, 'random').mockRestore();
  });
});
