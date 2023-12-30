import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";

const ContinueShopping = () => {
  const navigate = useNavigate();

  // Handlers
  const navToShoppingHandler = () => {
    navigate("/products");
  };
  return (
    <div className="flex flex-col items-start gap-8 lg:gap-16 lg:flex-row lg:items-center bg-gray p-8 lg:p-16 mt-32">
      <div>
        <h4 className="text-[22px] lg:text-[30px] font-normal mb-2">
          Continue Shopping
        </h4>
        <p>
          Discover more products that are perfect for gift, for your wardrobe,
          or a unique addition to your collection.
        </p>
      </div>
      <Button onClick={navToShoppingHandler} size={"lg"}>
        Continue Shopping
      </Button>
    </div>
  );
};

export default ContinueShopping;
