import CartItem from "./CartItem";

import { CartItem as CartItemType } from "@/types";

type CartListProps = {
  cart: CartItemType[];
};

const CartList = ({ cart }: CartListProps) => {
  return (
    <ul className="py-8 space-y-4 border-y border-[#f3f3f3]">
      {cart.map((cartItem) => (
        <CartItem key={cartItem.name} cartItem={cartItem} />
      ))}
    </ul>
  );
};

export default CartList;
