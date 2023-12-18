import { useParams } from "react-router-dom";

import ProductSkeleton from "@/components/shared/Skeletons/ProductSkeleton";
import { Button } from "@/components/ui/button";
import { useGetProduct } from "@/lib/react-query/queries";
import { IMAGE_BASE_URL } from "@/constants";

const Product = () => {
  const { productId } = useParams();
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProduct(productId || "", "categoryId");

  if (isError) return <div>Error: {error.message}</div>;

  if (isLoading) return <ProductSkeleton />;

  return (
    <section className="common-container flex flex-col md:flex-row gap-8 mb-20">
      {/* Image */}
      <div className="relative min-h-[260px] bg-gray md:flex-1 lg:min-h-[320px]">
        <img
          className="absolute w-full h-full object-contain p-8"
          src={IMAGE_BASE_URL + product?.imageUrl}
          alt={product?.name}
        />
      </div>
      {/* Content */}
      <div className="flex flex-col p-4 md:flex-1">
        <h3 className="text-[26px] lg:text-[32px] font-semibold leading-normal mb-3">
          {product?.name}
        </h3>
        <span className="text-[15px] lg:text-[17px] mb-4">
          {typeof product?.categoryId !== "string" && product?.categoryId?.name}{" "}
          |
          {product?.inStuck ? (
            <span className="text-green-500 ml-2">In Stock</span>
          ) : (
            <span className="text-red-500 ml-2">Out of Stock</span>
          )}
        </span>
        <span className="text-[16px] lg:text-[18px]">${product?.price}</span>
        <div className="my-6">
          <h6 className="text-[16px] lg:text-[20px] font-semibold">
            Description
          </h6>
          <p className="text-[15px] lg:text-[17px]">{product?.description}</p>
        </div>
        <Button size={"lg"}>Add to Cart</Button>
      </div>
    </section>
  );
};

export default Product;
