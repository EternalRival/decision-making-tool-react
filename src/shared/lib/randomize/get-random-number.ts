export function getRandomNumber(min: number, max: number): number {
  if (min > max) {
    throw new Error('min must be less than or equal to max');
  }

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
