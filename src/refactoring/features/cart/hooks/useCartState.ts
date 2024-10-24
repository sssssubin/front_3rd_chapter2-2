import { useState } from "react";
import { CartState } from "../types";

export const useCartState = () => {
  const [state, setState] = useState<CartState>({
    items: [],
    coupon: null,
  });

  return {
    state,
    setState,
  };
};
