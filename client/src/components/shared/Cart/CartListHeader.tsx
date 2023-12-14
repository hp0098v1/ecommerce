const CartListHeader = () => {
  return (
    <div className="hidden md:grid grid-cols-[100px_2fr_1fr] gap-4 w-full mb-2 font-semibold">
      <p>Products</p>
      <div className="grid grid-cols-4">
        <p></p>
        <p></p>
        <p></p>
        <p className="text-right">Quantity</p>
      </div>
      <p className="text-right">Subtotal</p>
    </div>
  );
};

export default CartListHeader;
