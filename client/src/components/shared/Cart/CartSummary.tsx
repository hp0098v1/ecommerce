import { useCartStore } from "@/lib/zustand/cartStore.ts";
import { Button } from "@/components/ui/button";

const CartSummary = () => {
  const { grandTotal } = useCartStore();

  return (
    <div className="flex flex-col gap-4  border border-[#f3f3f3] p-4">
      <h6 className="text-[15px] md:text-[18px] border-b border-[#f3f3f3] p-3">
        Summary
      </h6>
      <p className="flex items-center justify-between border-b border-[#f3f3f3] p-3">
        <span>Delivery Charge</span> <span>$0</span>
      </p>
      <h6 className="flex items-center justify-between text-[15px] md:text-[18px] border-b border-[#f3f3f3] p-3">
        <span>Grand Total</span>
        <span>${grandTotal}</span>
      </h6>
      <Button size={"lg"}>Proceed to Checkout</Button>
    </div>
  );
};

export default CartSummary;
