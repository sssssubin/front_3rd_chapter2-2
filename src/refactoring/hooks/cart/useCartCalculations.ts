import { useCallback } from "react";
import { CartState } from "./types";
import { calculateCartTotal } from "../utils/cartUtils";

export const useCartCalculations = (state: CartState) => {
  const calculateTotal = useCallback(() => {
    const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } =
      calculateCartTotal(state.items, state.coupon);

    return {
      totalBeforeDiscount,
      totalAfterDiscount,
      totalDiscount,
    };
  }, [state.items, state.coupon]);

  return {
    calculateTotal,
  };
};
