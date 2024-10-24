import { formatPrice } from "../../../../shared/utils/format";
import type { CartItemInfoProps } from "./types";

export const CartItemInfo = ({ item, appliedDiscount }: CartItemInfoProps) => (
  <div>
    <span className="font-semibold">{item.product.name}</span>
    <br />
    <span className="text-sm text-gray-600">
      {formatPrice(item.product.price)}원 x {item.quantity}
      {appliedDiscount > 0 && (
        <span className="text-green-600 ml-1">
          ({(appliedDiscount * 100).toFixed(0)}% 할인 적용)
        </span>
      )}
    </span>
  </div>
);
