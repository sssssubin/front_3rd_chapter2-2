import { Coupon } from "../../../types";

export interface CouponsState {
  items: Coupon[];
}

export interface CouponsActions {
  addCoupon: (newCoupon: Coupon) => boolean;
}
