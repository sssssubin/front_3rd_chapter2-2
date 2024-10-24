import { Coupon } from "../../coupon/types";

export const calculateCouponDiscount = (
  originalPrice: number,
  coupon: Coupon
): number => {
  if (coupon.discountType === "amount") {
    return Math.min(originalPrice, coupon.discountValue);
  }
  return (originalPrice * Math.min(100, coupon.discountValue)) / 100;
};

export const validateCoupon = (coupon: Coupon): boolean => {
  return (
    coupon.name.trim() !== "" &&
    coupon.code.trim() !== "" &&
    coupon.discountValue > 0 &&
    (coupon.discountType === "amount" || coupon.discountValue <= 100)
  );
};
