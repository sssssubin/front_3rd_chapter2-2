export const formatPercentage = (rate: number): string =>
  `${(rate * 100).toFixed(0)}%`;

export const formatPrice = (price: number): string =>
  price.toLocaleString("ko-KR");
