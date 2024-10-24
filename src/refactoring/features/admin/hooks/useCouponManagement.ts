import { useState } from "react";
import { Coupon } from "../../coupon/types";

export const useCouponManagement = (onCouponAdd: (coupon: Coupon) => void) => {
  const [newCoupon, setNewCoupon] = useState<Coupon>({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
  });

  const handleAddCoupon = () => {
    onCouponAdd(newCoupon);
    setNewCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: 0,
    });
  };

  const updateCouponField = <K extends keyof Coupon>(
    field: K,
    value: Coupon[K]
  ) => {
    setNewCoupon((prev) => ({ ...prev, [field]: value }));
  };

  return {
    newCoupon,
    handleAddCoupon,
    updateCouponField,
  };
};
