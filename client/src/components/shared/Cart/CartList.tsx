import CartItem from "./CartItem";

import { TCartItem } from "@/types";

type CartListProps = {
  cart: TCartItem[];
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
