
import { useState } from "react";
import { Product } from "../../product/types";
import { useDiscountManagement } from "./useDiscountManagement";

export const useProductManagement = (
  _initialProducts: Product[],
  onProductUpdate: (product: Product) => void,
  onProductAdd: (product: Product) => void
) => {
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showNewProductForm, setShowNewProductForm] = useState(false);
  const [newProduct, setNewProduct] = useState<Omit<Product, "id">>({
    name: "",
    price: 0,
    stock: 0,
    discounts: [],
  });

  const discountManagement = useDiscountManagement(onProductUpdate);

  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  const handleProductUpdate = (
    productId: string,
    field: keyof Product,
    value: any
  ) => {
    if (editingProduct && editingProduct.id === productId) {
      const updatedProduct = { ...editingProduct, [field]: value };
      setEditingProduct(updatedProduct);
    }
  };

  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleAddNewProduct = () => {
    const productWithId = { ...newProduct, id: Date.now().toString() };
    onProductAdd(productWithId);
    setNewProduct({
      name: "",
      price: 0,
      stock: 0,
      discounts: [],
    });
    setShowNewProductForm(false);
  };

  const handleAddDiscount = (productId: string) => {
    if (!editingProduct || editingProduct.id !== productId) return;
    const updatedProduct = discountManagement.addDiscount(editingProduct);
    setEditingProduct(updatedProduct);
  };

  const handleRemoveDiscount = (productId: string, index: number) => {
    if (!editingProduct || editingProduct.id !== productId) return;
    const updatedProduct = discountManagement.removeDiscount(editingProduct, index);
    setEditingProduct(updatedProduct);
  };

  return {
    openProductIds,
    editingProduct,
    showNewProductForm,
    newProduct,
    newDiscount: discountManagement.newDiscount,
    toggleProductAccordion,
    handleEditProduct,
    handleProductUpdate,
    handleEditComplete,
    handleAddDiscount,
    handleRemoveDiscount,
    handleAddNewProduct,
    setShowNewProductForm,
    setNewProduct,
    updateDiscountField: discountManagement.updateDiscountField,
  };
};