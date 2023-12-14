import CartItem from "./CartItem";

type TCartItem = {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
};

type CartListProps = {
  cart: TCartItem[];
};

const CartList = ({ cart }: CartListProps) => {
  return (
    <ul className="py-8 border-y border-[#f3f3f3]">
      {cart.map((cartItem) => (
        <CartItem key={cartItem.name} cartItem={cartItem} />
      ))}
    </ul>
  );
};

export default CartList;
