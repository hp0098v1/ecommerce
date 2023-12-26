import { IMAGE_BASE_URL } from "@/constants";
import { useCartStore } from "@/lib/zustand/cartStore.ts";
import { CartItem as CartItemType } from "@/types";

type CartItemProps = {
  cartItem: CartItemType;
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const { incQuantity, decQuantity, deleteProduct } = useCartStore();

  //   Handlers
  const incQuantityHandler = () => {
    incQuantity(cartItem.productId);
  };
  const decQuantityHandler = () => {
    if (cartItem.quantity === 1) {
      return deleteProduct(cartItem.productId);
    }
    decQuantity(cartItem.productId);
  };
  const deleteProductHandler = () => {
    deleteProduct(cartItem.productId);
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
        <button onClick={deleteProductHandler}>
          <img className="w-6 h-6" src="/assets/icons/delete.svg" alt="" />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
