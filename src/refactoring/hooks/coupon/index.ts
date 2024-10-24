
import { useCouponsState } from "./useCouponsState";
import { useCouponsActions } from "./useCouponsActions";
import { Coupon } from "../../../types";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const { state, setState } = useCouponsState(initialCoupons);
  const actions = useCouponsActions(state, setState);

  return {
    coupons: state.items,
    ...actions,
  };
};
