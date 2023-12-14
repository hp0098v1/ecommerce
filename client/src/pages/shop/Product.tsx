import ProductSkeleton from "@/components/shared/Skeletons/ProductSkeleton";
import { Button } from "@/components/ui/button";

const mockProduct = {
  id: 1,
  image: "/admin-ui/products/apple-iphone-15-pro-1tb-blue-titanium.png",
  name: "Phone",
  description:
    "Dive into luxury with the Apple iPhone 15 Pro in Blue Titanium. Unleash powerful performance, stunning visuals, and abundant storage with 1TB, redefining excellence in smartphone technology.",
  price: 1500,
  category: "Phone",
  inStock: true,
};

const Product = () => {
  const isLoading = false;

  if (isLoading) return <ProductSkeleton />;

  return (
    <section className="common-container flex flex-col md:flex-row gap-8 mb-20">
      {/* Image */}
      <div className="relative min-h-[260px] bg-gray md:flex-1 lg:min-h-[320px]">
        <img
          className="absolute w-full h-full object-contain p-8"
          src={mockProduct.image}
          alt={mockProduct.name}
        />
      </div>
      {/* Content */}
      <div className="flex flex-col p-4 md:flex-1">
        <h3 className="text-[26px] lg:text-[32px] font-semibold mb-3">
          {mockProduct.name}
        </h3>
        <span className="text-[15px] lg:text-[17px] mb-4">
          {mockProduct.category} |
          {mockProduct.inStock ? (
            <span className="text-green-500 ml-2">In Stock</span>
          ) : (
            <span className="text-red-500 ml-2">Out of Stock</span>
          )}
        </span>
        <span className="text-[16px] lg:text-[18px]">${mockProduct.price}</span>
        <div className="my-6">
          <h6 className="text-[16px] lg:text-[20px] font-semibold">
            Description
          </h6>
          <p className="text-[15px] lg:text-[17px]">
            {mockProduct.description}
          </p>
        </div>
        <Button size={"lg"}>Add to Cart</Button>
      </div>
    </section>
  );
};

export default Product;
