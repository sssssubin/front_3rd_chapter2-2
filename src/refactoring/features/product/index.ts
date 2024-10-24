import { Product } from "./types";
import { useProductsActions } from "./hooks/useProductsActions";
import { useProductsState } from "./hooks/useProductsState";

export const useProducts = (initialProducts: Product[]) => {
  const { state, setState } = useProductsState(initialProducts);
  const actions = useProductsActions(state, setState);

  return {
    products: state.items,
    ...actions,
  };
};
