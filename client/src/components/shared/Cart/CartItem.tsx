type CartItem = {
  id: number;
  image: string;
  name: string;
  price: number;
  quantity: number;
};

type CartItemProps = {
  cartItem: CartItem;
};

const CartItem = ({ cartItem }: CartItemProps) => {
  return (
    <li className="grid grid-cols-[100px_2fr_1fr] gap-4">
      <div className="bg-gray p-4">
        <img src={cartItem.image} alt="" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 md:items-center  md:justify-between">
        <div className="w-full overflow-hidden whitespace-nowrap text-ellipsis">
          <h4 className="text-[15px] md:text-[18px] font-semibold mb-2">
            {cartItem.name}
          </h4>
          <p className="text-[16px] md:text-[18px]">${cartItem.price}</p>
        </div>
        <div className="justify-self-start md:justify-self-end flex justify-between items-center w-[100px] p-1 rounded-lg border border-[#131118]">
          <button>
            <img className="w-6 h-6" src="/assets/icons/minus.svg" alt="" />
          </button>
          <span className="text-[15px] md:text-[18px] font-semibold">
            {cartItem.quantity}
          </span>
          <button>
            <img className="w-6 h-6" src="/assets/icons/plus.svg" alt="" />
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-8 justify-between items-end  md:flex-row  md:items-center  md:justify-end">
        <span className="text-[16px] lg:text-[18px]">
          ${cartItem.price * cartItem.quantity}
        </span>
        <button>
          <img className="w-6 h-6" src="/assets/icons/delete.svg" alt="" />
        </button>
      </div>
    </li>
  );
};

export default CartItem;
