import { Product } from "../features/product/types";
import { Coupon } from "../features/coupon/types";
import { useCouponManagement } from "../features/admin/hooks/useCouponManagement";
import { useProductManagement } from "../features/admin/hooks/useProductManagement";
import { CouponManagement } from "../features/admin/components/CouponManagement";
import { ProductList } from "../features/admin/components/ProductList";
interface Props {
  products: Product[];
  coupons: Coupon[];
  onProductUpdate: (updatedProduct: Product) => void;
  onProductAdd: (newProduct: Product) => void;
  onCouponAdd: (newCoupon: Coupon) => void;
}

export const AdminPage = ({
  products,
  coupons,
  onProductUpdate,
  onProductAdd,
  onCouponAdd,
}: Props) => {
  const productManagement = useProductManagement(
    products,
    onProductUpdate,
    onProductAdd
  );

  const couponManagement = useCouponManagement(onCouponAdd);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">관리자 페이지</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4">상품 관리</h2>
          <button
            onClick={() =>
              productManagement.setShowNewProductForm(
                !productManagement.showNewProductForm
              )
            }
            className="bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
          >
            {productManagement.showNewProductForm ? "취소" : "새 상품 추가"}
          </button>

          <ProductList products={products} {...productManagement} />
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">쿠폰 관리</h2>
          <CouponManagement coupons={coupons} {...couponManagement} />
        </div>
      </div>
    </div>
  );
};
