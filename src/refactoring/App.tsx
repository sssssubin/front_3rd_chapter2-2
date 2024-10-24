import { useState } from "react";
import { CartPage } from "./pages/CartPage.tsx";
import { AdminPage } from "./pages/AdminPage.tsx";
import { useCoupons } from "./features/coupon/index.ts";
import { useProducts } from "./features/product/index.ts";
import { Navigation } from "./shared/components/layout/Navigation.tsx";
import { MainLayout } from "./shared/components/layout/MainLayout.tsx";
import { initialCoupons, initialProducts } from "./data/index.ts";

const App = () => {
  const { products, updateProduct, addProduct } = useProducts(initialProducts);
  const { coupons, addCoupon } = useCoupons(initialCoupons);
  const [isAdmin, setIsAdmin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navigation
        isAdmin={isAdmin}
        onToggleAdmin={() => setIsAdmin(!isAdmin)}
      />
      <MainLayout>
        {isAdmin ? (
          <AdminPage
            products={products}
            coupons={coupons}
            onProductUpdate={updateProduct}
            onProductAdd={addProduct}
            onCouponAdd={addCoupon}
          />
        ) : (
          <CartPage products={products} coupons={coupons} />
        )}
      </MainLayout>
    </div>
  );
};

export default App;
