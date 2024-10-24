import { Product } from "../../types";
import { DiscountList } from "./DiscountList";
import { ProductStock } from "./ProductStock";

interface ProductCardProps {
  product: Product;
  remainingStock: number;
  onAddToCart: (product: Product) => void;
}

export const ProductCard = ({ product, remainingStock, onAddToCart }: ProductCardProps) => (
  <div
    data-testid={`product-${product.id}`}
    className="bg-white p-3 rounded shadow"
  >
    <div className="flex justify-between items-center mb-2">
      <span className="font-semibold">{product.name}</span>
      <span className="text-gray-600">{product.price.toLocaleString()}원</span>
    </div>
    <ProductStock stock={remainingStock} discounts={product.discounts} />
    <DiscountList discounts={product.discounts} />
    <button
      onClick={() => onAddToCart(product)}
      className={`w-full px-3 py-1 rounded ${
        remainingStock > 0
          ? "bg-blue-500 text-white hover:bg-blue-600"
          : "bg-gray-300 text-gray-500 cursor-not-allowed"
      }`}
      disabled={remainingStock <= 0}
    >
      {remainingStock > 0 ? "장바구니에 추가" : "품절"}
    </button>
  </div>
);
