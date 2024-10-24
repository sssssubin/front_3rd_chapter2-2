import { Discount } from "../../discount/types";
import { Product } from "../../product/types";

interface ProductItemProps {
  product: Product;
  index: number;
  isOpen: boolean;
  isEditing: boolean;
  editingProduct: Product | null;
  newDiscount: Discount;
  onToggle: () => void;
  onEdit: () => void;
  onUpdate: (productId: string, field: keyof Product, value: any) => void;
  onEditComplete: () => void;
  onAddDiscount: () => void;
  onRemoveDiscount: (index: number) => void;
  updateDiscountField: (field: keyof Discount, value: number) => void; // 변경된 부분
}

export const ProductItem = ({
  product,
  index,
  isOpen,
  isEditing,
  editingProduct,
  newDiscount,
  onToggle,
  onEdit,
  onUpdate,
  onEditComplete,
  onAddDiscount,
  onRemoveDiscount,
  updateDiscountField,
}: ProductItemProps) => {
  return (
    <div
      data-testid={`product-${index + 1}`}
      className="bg-white p-4 rounded shadow"
    >
      <button
        data-testid="toggle-button"
        onClick={onToggle}
        className="w-full text-left font-semibold"
      >
        {product.name} - {product.price}원 (재고: {product.stock})
      </button>

      {isOpen && (
        <div className="mt-2">
          {isEditing && editingProduct ? (
            <div>
              <div className="mb-4">
                <label className="block mb-1">상품명: </label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => onUpdate(product.id, "name", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">가격: </label>
                <input
                  type="number"
                  value={editingProduct.price}
                  onChange={(e) =>
                    onUpdate(product.id, "price", parseInt(e.target.value))
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div className="mb-4">
                <label className="block mb-1">재고: </label>
                <input
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) =>
                    onUpdate(product.id, "stock", parseInt(e.target.value))
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <h4 className="text-lg font-semibold mb-2">할인 정보</h4>
                {editingProduct.discounts.map((discount, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-2"
                  >
                    <span>
                      {discount.quantity}개 이상 구매 시 {discount.rate * 100}%
                      할인
                    </span>
                    <button
                      onClick={() => onRemoveDiscount(index)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      삭제
                    </button>
                  </div>
                ))}

                <div className="flex space-x-2">
                  <input
                    type="number"
                    placeholder="수량"
                    value={newDiscount.quantity}
                    onChange={(e) =>
                      updateDiscountField("quantity", parseInt(e.target.value))
                    }
                    className="w-1/3 p-2 border rounded"
                  />
                  <input
                    type="number"
                    placeholder="할인율 (%)"
                    value={newDiscount.rate * 100}
                    onChange={(e) =>
                      updateDiscountField("rate", parseInt(e.target.value))
                    }
                    className="w-1/3 p-2 border rounded"
                  />
                  <button
                    onClick={onAddDiscount}
                    className="w-1/3 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                  >
                    할인 추가
                  </button>
                </div>
              </div>

              <button
                onClick={onEditComplete}
                className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600 mt-2"
              >
                수정 완료
              </button>
            </div>
          ) : (
            <div>
              {product.discounts.map((discount, index) => (
                <div key={index} className="mb-2">
                  <span>
                    {discount.quantity}개 이상 구매 시 {discount.rate * 100}%
                    할인
                  </span>
                </div>
              ))}
              <button
                data-testid="modify-button"
                onClick={onEdit}
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mt-2"
              >
                수정
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
