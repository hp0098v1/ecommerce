import { Link } from "react-router-dom";

import { useAuthStore, useCartStore } from "@/lib/zustand";

import CartList from "@/components/shared/Cart/CartList";
import CartListHeader from "@/components/shared/Cart/CartListHeader";
import CartSummary from "@/components/shared/Cart/CartSummary";
import ContinueShopping from "@/components/shared/Cart/ContinueShopping";
import CartSkeleton from "@/components/shared/Skeletons/CartSkeleton";
import { useGetCart } from "@/lib/react-query/queries";
import { TCartItem } from "@/types";

const Cart = () => {
  const { isLoggedIn } = useAuthStore();
  let products: TCartItem[] = [];
  const { products: productsStore } = useCartStore();
  const { data, isLoading, isSuccess } = useGetCart(isLoggedIn);

  if (isLoading) return <CartSkeleton />;
  if (isLoggedIn) {
    if (isSuccess) products = data?.cart?.products;
  } else {
    products = productsStore;
  }

  return (
    <section className="common-container mt-12">
      <h3 className="text-[26px] md:text-[32px] font-semibold mb-8">Cart</h3>

      {products.length === 0 ? (
        <Link to={"/products"}>Your cart is empty. Click here to shop</Link>
      ) : (
        <div className="grid gap-20 2xl:grid-cols-[65%_1fr] 2xl:gap-12 mb-8">
          <div>
            <CartListHeader />
            <CartList cart={products} />
          </div>

          <CartSummary />
        </div>
      )}

      <ContinueShopping />
    </section>
  );
};

export default Cart;
