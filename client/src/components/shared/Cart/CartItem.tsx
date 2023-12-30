import { useCartStore } from "@/lib/zustand";
import { IMAGE_BASE_URL } from "@/constants";
import { TCartItem } from "@/types";
import { useUpdateCart } from "@/lib/react-query/queries";
import { removeCartItem, updateCartItem } from "@/lib/utils";

type CartItemProps = {
  cartItem: TCartItem;
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const { cartId, products, updateCart, removeItem } = useCartStore();
  const { mutate } = useUpdateCart();

  //   Handlers
  const incQuantityHandler = () => {
    const [updatedCart, grandTotal] = updateCartItem(
      products,
      cartItem.productId,
      cartItem.quantity + 1
    );
    updateCart(updatedCart, grandTotal);
    if (cartId !== null)
      mutate({ data: { products: updatedCart, grandTotal }, cartId: cartId });
  };
  const decQuantityHandler = () => {
    if (cartItem.quantity === 1) {
      return deleteItemHandler();
    }
    const [updatedCart, grandTotal] = updateCartItem(
      products,
      cartItem.productId,
      cartItem.quantity - 1
    );

    updateCart(updatedCart, grandTotal);
    if (cartId !== null)
      mutate({ data: { products: updatedCart, grandTotal }, cartId: cartId });
  };
  const deleteItemHandler = () => {
    const [updatedCart, grandTotal] = removeCartItem(
      products,
      cartItem.productId
    );
    removeItem(updatedCart, grandTotal);
    if (cartId !== null)
      mutate({ data: { products: updatedCart, grandTotal }, cartId: cartId });
  };

  return (
    <li className="grid grid-cols-[100px_2fr_1fr] gap-4">
      <div className="bg-gray p-4">
        <img src={IMAGE_BASE_URL + cartItem.imageUrl} alt="" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 md:items-center  md:justify-between">
        <div className="w-full overflow-hidden whitespace-nowrap text-ellipsis">
          <h4 className="text-[15px] md:text-[18px] font-semibold mb-2">
            {cartItem.name}
          </h4>
          <p className="text-[16px] md:text-[18px]">${cartItem.price}</p>
        </div>
        <div className="justify-self-start md:justify-self-end flex justify-between items-center w-[100px] p-1 rounded-lg border border-[#131118]">
          <button onClick={decQuantityHandler}>
            <img className="w-6 h-6" src="/assets/icons/minus.svg" alt="" />
          </button>
          <span className="text-[15px] md:text-[18px] font-semibold">
            {cartItem.quantity}
          </span>
          <button onClick={incQuantityHandler}>
            <img className="w-6 h-6" src="/assets/icons/plus.svg" alt="" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-8 justify-between items-end  md:flex-row  md:items-center  md:justify-end">
        <span className="text-2">${cartItem.subtotal}</span>
        <button onClick={deleteItemHandler}>
          <img className="w-6 h-6" src="/assets/icons/delete.svg" alt="" />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
