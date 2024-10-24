import { Coupon } from "../../coupon/types";
import { validateCoupon } from "../utils/couponUtils";

interface CouponManagementProps {
  coupons: Coupon[];
  newCoupon: Coupon;
  handleAddCoupon: () => void;
  updateCouponField: <K extends keyof Coupon>(
    field: K,
    value: Coupon[K]
  ) => void;
}

export const CouponManagement = ({
  coupons,
  newCoupon,
  handleAddCoupon,
  updateCouponField,
}: CouponManagementProps) => {
  const isValidCoupon = validateCoupon(newCoupon);

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="space-y-2 mb-4">
        <input
          type="text"
          placeholder="쿠폰 이름"
          value={newCoupon.name}
          onChange={(e) => updateCouponField("name", e.target.value)}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="쿠폰 코드"
          value={newCoupon.code}
          onChange={(e) => updateCouponField("code", e.target.value)}
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-2">
          <select
            value={newCoupon.discountType}
            onChange={(e) =>
              updateCouponField(
                "discountType",
                e.target.value as "amount" | "percentage"
              )
            }
            className="w-full p-2 border rounded"
          >
            <option value="amount">금액(원)</option>
            <option value="percentage">할인율(%)</option>
          </select>
          <input
            type="number"
            placeholder="할인 값"
            value={newCoupon.discountValue}
            onChange={(e) =>
              updateCouponField("discountValue", parseInt(e.target.value))
            }
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          onClick={handleAddCoupon}
          disabled={!isValidCoupon}
          className={`w-full p-2 rounded ${
            isValidCoupon
              ? "bg-green-500 text-white hover:bg-green-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          쿠폰 추가
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-2">현재 쿠폰 목록</h3>
        <div className="space-y-2">
          {coupons.map((coupon, index) => (
            <div
              key={index}
              data-testid={`coupon-${index + 1}`}
              className="bg-gray-100 p-2 rounded"
            >
              {coupon.name} ({coupon.code}):
              {coupon.discountType === "amount"
                ? `${coupon.discountValue.toLocaleString()}원`
                : `${coupon.discountValue}%`}{" "}
              할인
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
