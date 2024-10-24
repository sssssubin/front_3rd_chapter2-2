export interface Coupon {
  name: string;
  code: string;
  discountType: "amount" | "percentage";
  discountValue: number;
}

export interface CouponsState {
  items: Coupon[];
}

export interface CouponsActions {
  addCoupon: (newCoupon: Coupon) => boolean;
}
