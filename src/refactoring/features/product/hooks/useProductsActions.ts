import { useCallback } from "react";
import { ProductsActions, ProductsState } from "../types";
import { Product } from "../types";

export const useProductsActions = (
  state: ProductsState,
  setState: (
    state: ProductsState | ((prevState: ProductsState) => ProductsState)
  ) => void
): ProductsActions => {
  const updateProduct = useCallback(
    (updatedProduct: Product): any => {
      setState((prevState) => {
        return {
          ...prevState,
          items: prevState.items.map((product) =>
            product.id === updatedProduct.id ? updatedProduct : product
          ),
        };
      });
    },
    [setState]
  );

  const addProduct = useCallback(
    (newProduct: Product): any => {
      setState((prevState) => {
        return {
          ...prevState,
          items: [...prevState.items, newProduct],
        };
      });
    },
    [setState]
  );

  return {
    updateProduct,
    addProduct,
  };
};
