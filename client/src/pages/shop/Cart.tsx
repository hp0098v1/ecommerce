import { Link } from "react-router-dom";

import CartList from "@/components/shared/Cart/CartList";
import CartListHeader from "@/components/shared/Cart/CartListHeader";
import CartSummary from "@/components/shared/Cart/CartSummary";
import ContinueShopping from "@/components/shared/Cart/ContinueShopping";
import CartSkeleton from "@/components/shared/Skeletons/CartSkeleton";

const mockCart = [
  {
    id: 1,
    image: "/admin-ui/products/apple-iphone-15-pro-1tb-blue-titanium.png",
    name: "Apple iPhone 15 Pro (1TB) - Blue Titanium",
    price: 1500,
    quantity: 2,
  },
];

const Cart = () => {
  const isLoading = false;

  if (isLoading) return <CartSkeleton />;

  return (
    <section className="common-container mt-12">
      <h3 className="text-[26px] md:text-[32px] font-semibold mb-8">Cart</h3>

      {mockCart.length === 0 ? (
        <Link to={"/products"}>Your cart is empty. Click here to shop</Link>
      ) : (
        <div className="grid gap-20 2xl:grid-cols-[65%_1fr] 2xl:gap-12 mb-8">
          <div>
            <CartListHeader />
            <CartList cart={mockCart} />
          </div>

          <CartSummary />
        </div>
      )}

      <ContinueShopping />
    </section>
  );
};

export default Cart;
