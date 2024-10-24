import { Coupon, Product } from "../../../types";

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  coupon: Coupon | null;
}