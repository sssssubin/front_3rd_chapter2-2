import { CartItem as CartItemType } from "../../types";

export interface CartListProps {
  items: CartItemType[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  getAppliedDiscount: (item: CartItemType) => number;
}

export interface CartItemProps {
  item: CartItemType;
  appliedDiscount: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export interface CartItemInfoProps {
  item: CartItemType;
  appliedDiscount: number;
}

export interface CartItemActionsProps {
  itemId: string;
  quantity: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}
