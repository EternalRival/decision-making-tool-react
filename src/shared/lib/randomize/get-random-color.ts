import { getRandomNumber } from './get-random-number';

const [min, max] = [0, 0xffffff];

export function getRandomColor(): string {
  return `#${getRandomNumber(min, max).toString(16).padStart(6, '0')}`;
}
