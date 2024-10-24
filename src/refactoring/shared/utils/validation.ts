export const isPositive = (number: number): boolean => number > 0;

export const isBetween = (number: number, min: number, max: number): boolean =>
  number >= min && number <= max;
