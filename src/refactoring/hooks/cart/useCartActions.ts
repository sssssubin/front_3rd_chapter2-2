import { useCallback } from "react";
import { CartState, CartActions } from "./types";
import { Coupon, Product } from "../../../types";
import { updateCartItemQuantity } from "./utils/cartUtils";

export const useCartActions = (
  state: CartState,
  setState: (state: CartState | ((prevState: CartState) => CartState)) => void
): CartActions => {
  const addItem = useCallback(
    (product: Product) => {
      setState((prevState) => {
        const existingItem = prevState.items.find(
          (item) => item.product.id === product.id
        );

        if (existingItem) {
          return {
            ...prevState,
            items: prevState.items.map((item) =>
              item.product.id === product.id
                ? {
                    ...item,
                    quantity: Math.min(item.quantity + 1, product.stock),
                  }
                : item
            ),
          };
        }

        return {
          ...prevState,
          items: [...prevState.items, { product, quantity: 1 }],
        };
      });
    },
    [setState]
  );

  const removeItem = useCallback(
    (productId: string) => {
      setState((prevState) => ({
        ...prevState,
        items: prevState.items.filter((item) => item.product.id !== productId),
      }));
    },
    [setState]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      setState((prevState) => {
        return {
          ...prevState,
          items: updateCartItemQuantity(prevState.items, productId, quantity),
        };
      });
    },
    [setState]
  );

  const applyCoupon = useCallback(
    (coupon: Coupon) => {
      setState((prevState) => ({
        ...prevState,
        coupon,
      }));
    },
    [setState]
  );

  return {
    addItem,
    removeItem,
    updateQuantity,
    applyCoupon,
  };
};
