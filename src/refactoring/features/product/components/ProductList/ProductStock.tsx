import { Discount } from "../../../discount/types";
import { getMaxDiscount } from "../../../discount/utils/discount";

interface ProductStockProps {
  stock: number;
  discounts: Discount[];
}

export const ProductStock = ({ stock, discounts }: ProductStockProps) => (
  <div className="text-sm text-gray-500 mb-2">
    <span className={`font-medium ${stock > 0 ? "text-green-600" : "text-red-600"}`}>
      재고: {stock}개
    </span>
    {discounts.length > 0 && (
      <span className="ml-2 font-medium text-blue-600">
        최대 {(getMaxDiscount(discounts) * 100).toFixed(0)}% 할인
      </span>
    )}
  </div>
);