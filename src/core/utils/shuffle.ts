export default function shuffle<T>(array: T[]): T[] {
  const result = Array.from(array);

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));

    const a = result[i];
    const b = result[j];

    if (typeof a === 'undefined' || typeof b === 'undefined') {
      throw new Error('a or b is undefined');
    }

    [result[i], result[j]] = [b, a];
  }

  return result;
}
