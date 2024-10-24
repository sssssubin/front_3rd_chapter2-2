import { Discount } from "../../discount/types";
import { Product } from "../../product/types";
import { NewProductForm } from "./NewProductForm";
import { ProductItem } from "./ProductItem";

interface ProductListProps {
  products: Product[];
  openProductIds: Set<string>;
  editingProduct: Product | null;
  showNewProductForm: boolean;
  newProduct: Omit<Product, "id">;
  newDiscount: { quantity: number; rate: number };
  toggleProductAccordion: (productId: string) => void;
  handleEditProduct: (product: Product) => void;
  handleProductUpdate: (
    productId: string,
    field: keyof Product,
    value: any
  ) => void;
  handleEditComplete: () => void;
  handleAddDiscount: (productId: string) => void;
  handleRemoveDiscount: (productId: string, index: number) => void;
  handleAddNewProduct: () => void;
  setNewProduct: React.Dispatch<React.SetStateAction<Omit<Product, "id">>>;
  updateDiscountField: (field: keyof Discount, value: number) => void;
}

export const ProductList = ({
  products,
  openProductIds,
  editingProduct,
  showNewProductForm,
  newProduct,
  newDiscount,
  toggleProductAccordion,
  handleEditProduct,
  handleProductUpdate,
  handleEditComplete,
  handleAddDiscount,
  handleRemoveDiscount,
  handleAddNewProduct,
  setNewProduct,
  updateDiscountField,
}: ProductListProps) => {
  return (
    <div className="space-y-4">
      {showNewProductForm && (
        <NewProductForm
          newProduct={newProduct}
          setNewProduct={setNewProduct}
          handleAddNewProduct={handleAddNewProduct}
        />
      )}

      <div className="space-y-2">
        {products.map((product, index) => (
          <ProductItem
            key={product.id}
            product={product}
            index={index}
            isOpen={openProductIds.has(product.id)}
            isEditing={editingProduct?.id === product.id}
            editingProduct={editingProduct}
            newDiscount={newDiscount}
            onToggle={() => toggleProductAccordion(product.id)}
            onEdit={() => handleEditProduct(product)}
            onUpdate={handleProductUpdate}
            onEditComplete={handleEditComplete}
            onAddDiscount={() => handleAddDiscount(product.id)}
            onRemoveDiscount={(index) =>
              handleRemoveDiscount(product.id, index)
            }
            updateDiscountField={updateDiscountField}
          />
        ))}
      </div>
    </div>
  );
};
