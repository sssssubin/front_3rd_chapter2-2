import { useCart } from "../features/cart";
import { CartList } from "../features/cart/components/CartList";
import { OrderSummary } from "../features/cart/components/OrderSummary";
import { CouponSelector } from "../features/coupon/components/CouponSelector";
import { Coupon } from "../features/coupon/types";
import { ProductCard } from "../features/product/components/ProductList";
import { Product } from "../features/product/types";
import { Heading } from "../shared/components/typography/Heading";

interface Props {
  products: Product[];
  coupons: Coupon[];
}

export const CartPage = ({ products, coupons }: Props) => {
  const {
    items: cart,
    addItem,
    removeItem,
    updateQuantity,
    applyCoupon,
    calculateTotal,
    coupon: selectedCoupon,
  } = useCart();

  const getRemainingStock = (product: Product) => {
    const cartItem = cart.find((item) => item.product.id === product.id);
    return product.stock - (cartItem?.quantity || 0);
  };

  const getAppliedDiscount = (item: any) => {
    const { discounts } = item.product;
    const { quantity } = item;
    return discounts.reduce(
      (maxDiscount: number, discount: { quantity: number; rate: number; }) =>
        quantity >= discount.quantity
          ? Math.max(maxDiscount, discount.rate)
          : maxDiscount,
      0
    );
  };

  const { totalBeforeDiscount, totalAfterDiscount, totalDiscount } = calculateTotal();

  return (
    <div className="container mx-auto p-4">
      <Heading level={1} className="mb-6">장바구니</Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Heading level={2} className="mb-4">상품 목록</Heading>
          <div className="space-y-2">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                remainingStock={getRemainingStock(product)}
                onAddToCart={addItem}
              />
            ))}
          </div>
        </div>
        <div>
          <CartList
            items={cart}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            getAppliedDiscount={getAppliedDiscount}
          />
          <CouponSelector
            coupons={coupons}
            selectedCoupon={selectedCoupon}
            onApplyCoupon={applyCoupon}
          />
          <OrderSummary
            totalBeforeDiscount={totalBeforeDiscount}
            totalAfterDiscount={totalAfterDiscount}
            totalDiscount={totalDiscount}
          />
        </div>
      </div>
    </div>
  );
};