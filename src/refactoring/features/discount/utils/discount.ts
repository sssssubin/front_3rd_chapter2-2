import { Discount } from "../types";

export const getMaxDiscount = (discounts: Discount[]): number => {
  return discounts.reduce((max, discount) => Math.max(max, discount.rate), 0);
};

export const formatDiscountRate = (rate: number): string =>
  `${(rate * 100).toFixed(0)}%`;
