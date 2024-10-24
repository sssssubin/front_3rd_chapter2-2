import { useState } from "react";
import { CouponsState } from "./types";
import { Coupon } from "../../../types";

export const useCouponsState = (initialCoupons: Coupon[]) => {
  const [state, setState] = useState<CouponsState>({
    items: initialCoupons,
  });

  return {
    state,
    setState,
  };
};
