import { useState } from "react";
import { Discount } from "../../discount/types";
import { Product } from "../../product/types";

export const useDiscountManagement = (
  onProductUpdate: (product: Product) => void
) => {
  const [newDiscount, setNewDiscount] = useState<Discount>({
    quantity: 0,
    rate: 0,
  });

  const addDiscount = (product: Product) => {
    const updatedProduct = {
      ...product,
      discounts: [...product.discounts, newDiscount],
    };
    onProductUpdate(updatedProduct);
    setNewDiscount({ quantity: 0, rate: 0 });
    return updatedProduct;
  };

  const removeDiscount = (product: Product, index: number) => {
    const updatedProduct = {
      ...product,
      discounts: product.discounts.filter((_, i) => i !== index),
    };
    onProductUpdate(updatedProduct);
    return updatedProduct;
  };

  const updateDiscountField = (field: keyof Discount, value: number) => {
    setNewDiscount(prev => ({
      ...prev,
      [field]: field === 'rate' ? value / 100 : value
    }));
  };

  return {
    newDiscount,
    addDiscount,
    removeDiscount,
    updateDiscountField,
  };
};
