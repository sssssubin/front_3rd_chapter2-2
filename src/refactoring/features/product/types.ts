import { Discount } from "../discount/types";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  discounts: Discount[];
}

export interface ProductsState {
  items: Product[];
}

export interface ProductsActions {
  updateProduct: (updatedProduct: Product) => boolean;
  addProduct: (newProduct: Product) => boolean;
}
