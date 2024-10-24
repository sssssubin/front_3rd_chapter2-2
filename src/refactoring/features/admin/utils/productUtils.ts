import { Discount } from "../../discount/types";
import { Product } from "../../product/types";

export const calculateDiscountedPrice = (
  product: Product,
  quantity: number
): number => {
  const applicableDiscount = findApplicableDiscount(
    product.discounts,
    quantity
  );
  if (!applicableDiscount) return product.price * quantity;

  return product.price * quantity * (1 - applicableDiscount.rate);
};

export const findApplicableDiscount = (
  discounts: Discount[],
  quantity: number
): Discount | null => {
  return (
    discounts
      .filter((d) => d.quantity <= quantity)
      .sort((a, b) => b.rate - a.rate)[0] || null
  );
};

export const validateProduct = (product: Omit<Product, "id">): boolean => {
  return (
    product.name.trim() !== "" &&
    product.price >= 0 &&
    product.stock >= 0 &&
    product.discounts.every((d) => d.quantity > 0 && d.rate > 0 && d.rate <= 1)
  );
};
