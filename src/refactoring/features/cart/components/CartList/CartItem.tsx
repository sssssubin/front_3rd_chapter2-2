import { CartItemActions } from "./CartItemActions";

interface CartItemProps {
  item: any;
  appliedDiscount: number;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemove: (id: string) => void;
}

export const CartItem = ({ item, appliedDiscount, onUpdateQuantity, onRemove }: CartItemProps) => (
  <div className="flex justify-between items-center bg-white p-3 rounded shadow">
    <div>
      <span className="font-semibold">{item.product.name}</span>
      <br />
      <span className="text-sm text-gray-600">
        {item.product.price}원 x {item.quantity}
        {appliedDiscount > 0 && (
          <span className="text-green-600 ml-1">
            ({(appliedDiscount * 100).toFixed(0)}% 할인 적용)
          </span>
        )}
      </span>
    </div>
    <CartItemActions 
      itemId={item.product.id}
      quantity={item.quantity}
      onUpdateQuantity={onUpdateQuantity}
      onRemove={onRemove}
    />
  </div>
);