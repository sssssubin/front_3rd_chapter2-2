import { useCallback } from "react";
import { CartState, CartActions } from "../types";
import { updateCartItemQuantity } from "../utils/calculation";
import { Product } from "../../product/types";
import { Coupon } from "../../coupon/types";

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
          if (existingItem.quantity >= product.stock) {
            // 재고 초과 에러 처리
            console.error("재고가 부족합니다.");
            return prevState;
          }

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
      setState((prevState) => {
        const itemExists = prevState.items.some(
          (item) => item.product.id === productId
        );

        if (!itemExists) {
          console.error("상품이 장바구니에 존재하지 않습니다.");
          return prevState;
        }

        return {
          ...prevState,
          items: prevState.items.filter(
            (item) => item.product.id !== productId
          ),
        };
      });
    },
    [setState]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity < 0) {
        console.error("수량은 0 이상이어야 합니다.");
        return;
      }

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
      if (!coupon) {
        console.error("유효하지 않은 쿠폰입니다.");
        return;
      }

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
