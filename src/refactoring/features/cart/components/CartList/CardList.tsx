import { Heading } from "../../../../shared/components/typography/Heading";
import { CartItem } from "./CartItem";
import { CartListProps } from "./types";

export const CartList = ({
  items,
  onUpdateQuantity,
  onRemoveItem,
  getAppliedDiscount,
}: CartListProps) => {
  if (items.length === 0) {
    return (
      <div>
        <Heading level={2} className="mb-4">
          장바구니 내역
        </Heading>
        <div className="text-gray-500 text-center py-8">
          장바구니가 비어있습니다.
        </div>
      </div>
    );
  }

  return (
    <div>
      <Heading level={2} className="mb-4">
        장바구니 내역
      </Heading>
      <div className="space-y-2">
        {items.map((item) => (
          <CartItem
            key={item.product.id}
            item={item}
            appliedDiscount={getAppliedDiscount(item)}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemoveItem}
          />
        ))}
      </div>
    </div>
  );
};
