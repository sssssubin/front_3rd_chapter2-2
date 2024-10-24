import { useState } from "react";
import { Product } from "../types";
import { ProductsState } from "../types";

export const useProductsState = (initialProducts: Product[]) => {
  const [state, setState] = useState<ProductsState>({
    items: initialProducts,
  });

  return {
    state,
    setState,
  };
};
