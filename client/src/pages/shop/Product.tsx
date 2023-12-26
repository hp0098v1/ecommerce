import { useNavigate, useParams } from "react-router-dom";

import ProductSkeleton from "@/components/shared/Skeletons/ProductSkeleton";
import { Button } from "@/components/ui/button";
import { useGetProductById } from "@/lib/react-query/queries";
import { useCartStore } from "@/lib/zustand/cartStore.ts";
import { IMAGE_BASE_URL } from "@/constants";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();

  // Zustand
  const { addProduct, products } = useCartStore();

  // React Query
  const { data, isLoading, isError, error } = useGetProductById(
    productId || "",
    "categoryId"
  );

  const product = data?.product;

  const isExistingProuductInCart = products.find(
    (p) => p.productId === product?._id
  );

  // Handlers
  const addToCartHandler = () => {
    if (isExistingProuductInCart) {
      return navigate("/cart");
    }
    if (product)
      addProduct(
        product?._id,
        product?.price,
        1,
        product?.name,
        product?.imageUrl
      );
  };

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
        <h3 className="h3-semibold leading-normal mb-3">{product?.name}</h3>
        <span className="text-1 mb-4">
          {typeof product?.categoryId !== "string" && product?.categoryId?.name}{" "}
          |
          {product?.inStuck ? (
            <span className="text-green-500 ml-2">In Stock</span>
          ) : (
            <span className="text-red-500 ml-2">Out of Stock</span>
          )}
        </span>
        <span className="text-2">${product?.price}</span>
        <div className="my-6">
          <h6 className="text-3 font-semibold">Description</h6>
          <p className="text-1">{product?.description}</p>
        </div>
        <Button
          // disabled={!!isExistingProuductInCart}
          onClick={addToCartHandler}
          size={"lg"}
        >
          {isExistingProuductInCart ? "Go to Cart" : "Add to Cart"}
        </Button>
      </div>
    </section>
  );
};

export default Product;
