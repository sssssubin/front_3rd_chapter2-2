import { useCallback } from "react";
import { CouponsState, CouponsActions } from "../types";
import { Coupon } from "../types";

export const useCouponsActions = (
  state: CouponsState,
  setState: (
    state: CouponsState | ((prevState: CouponsState) => CouponsState)
  ) => void
): CouponsActions => {
  const addCoupon = useCallback(
    (newCoupon: Coupon): any => {
      setState((prevState) => {
        return {
          ...prevState,
          items: [...prevState.items, newCoupon],
        };
      });
    },
    [setState]
  );

  return {
    addCoupon,
  };
};
