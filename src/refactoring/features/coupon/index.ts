import { useCouponsState } from "./hooks/useCouponsState";
import { useCouponsActions } from "./hooks/useCouponsActions";
import { Coupon } from "./types";

export const useCoupons = (initialCoupons: Coupon[]) => {
  const { state, setState } = useCouponsState(initialCoupons);
  const actions = useCouponsActions(state, setState);

  return {
    coupons: state.items,
    ...actions,
  };
};
