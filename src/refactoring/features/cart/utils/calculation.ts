import { CartItem } from "../types";
import { Coupon } from "../../coupon/types";
import { sum, round, clamp } from "../../../shared/utils/common";

export const calculateDiscountRate = (
  quantity: number,
  discounts: Array<{ quantity: number; rate: number }>
): number => {
  return discounts.reduce(
    (maxRate, discount) =>
      quantity >= discount.quantity
        ? Math.max(maxRate, discount.rate)
        : maxRate,
    0
  );
};

export const calculateItemPrice = (price: number, quantity: number): number =>
  price * quantity;

export const calculateItemDiscount = (item: CartItem): number => {
  const discountRate = calculateDiscountRate(
    item.quantity,
    item.product.discounts
  );
  return calculateItemPrice(item.product.price, item.quantity) * discountRate;
};

export const calculateItemTotal = (item: CartItem): number => {
  const basePrice = calculateItemPrice(item.product.price, item.quantity);
  const discountAmount = calculateItemDiscount(item);
  return basePrice - discountAmount;
};

export const calculateCouponDiscount = (
  amount: number,
  coupon: Coupon | null
): number => {
  if (!coupon) return 0;

  if (coupon.discountType === "amount") {
    return Math.min(amount, coupon.discountValue);
  }

  return amount * (coupon.discountValue / 100);
};

export const calculateCartTotals = (
  items: CartItem[],
  coupon: Coupon | null
) => {
  const totalBeforeDiscount = sum(
    items.map((item) => calculateItemPrice(item.product.price, item.quantity))
  );

  const totalAfterItemDiscounts = sum(items.map(calculateItemTotal));
  const couponDiscount = calculateCouponDiscount(
    totalAfterItemDiscounts,
    coupon
  );
  const totalAfterDiscount = totalAfterItemDiscounts - couponDiscount;

  return {
    totalBeforeDiscount: round(totalBeforeDiscount),
    totalAfterDiscount: round(totalAfterDiscount),
    totalDiscount: round(totalBeforeDiscount - totalAfterDiscount),
  };
};

export const updateCartItemQuantity = (
  items: CartItem[],
  productId: string,
  quantity: number
): CartItem[] => {
  return items
    .map((item) => {
      if (item.product.id === productId) {
        const newQuantity = clamp(quantity, 0, item.product.stock);
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    })
    .filter((item): item is CartItem => item !== null);
};
