export const sum = (numbers: number[]): number =>
  numbers.reduce((acc, curr) => acc + curr, 0);

export const round = (number: number): number => Math.round(number);

export const clamp = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);
