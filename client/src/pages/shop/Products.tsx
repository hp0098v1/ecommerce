import ProductsSkeleton from "@/components/shared/Skeletons/ProductsSkeleton";
import ProductCard from "@/components/shared/Products/ProductCard";
import ProductsFilter from "@/components/shared/Products/ProductsFilter";

const mockProducts = [
  {
    id: 1,
    image: "/admin-ui/products/apple-iphone-15-pro-1tb-blue-titanium.png",
    name: "Phone",
    description:
      "Dive into luxury with the Apple iPhone 15 Pro in Blue Titanium. Unleash powerful performance, stunning visuals, and abundant storage with 1TB, redefining excellence in smartphone technology.",
    price: 1500,
  },
  {
    id: 1,
    image: "/admin-ui/products/apple-iphone-15-pro-1tb-blue-titanium.png",
    name: "Phone",
    description:
      "Dive into luxury with the Apple iPhone 15 Pro in Blue Titanium. Unleash powerful performance, stunning visuals, and abundant storage with 1TB, redefining excellence in smartphone technology.",
    price: 1500,
  },
  {
    id: 1,
    image: "/admin-ui/products/apple-iphone-15-pro-1tb-blue-titanium.png",
    name: "Phone",
    description:
      "Dive into luxury with the Apple iPhone 15 Pro in Blue Titanium. Unleash powerful performance, stunning visuals, and abundant storage with 1TB, redefining excellence in smartphone technology.",
    price: 1500,
  },
  {
    id: 1,
    image: "/admin-ui/products/apple-iphone-15-pro-1tb-blue-titanium.png",
    name: "Phone",
    description:
      "Dive into luxury with the Apple iPhone 15 Pro in Blue Titanium. Unleash powerful performance, stunning visuals, and abundant storage with 1TB, redefining excellence in smartphone technology.",
    price: 1500,
  },
  {
    id: 1,
    image: "/admin-ui/products/apple-iphone-15-pro-1tb-blue-titanium.png",
    name: "Phone",
    description:
      "Dive into luxury with the Apple iPhone 15 Pro in Blue Titanium. Unleash powerful performance, stunning visuals, and abundant storage with 1TB, redefining excellence in smartphone technology.",
    price: 1500,
  },
  {
    id: 1,
    image: "/admin-ui/products/apple-iphone-15-pro-1tb-blue-titanium.png",
    name: "Phone",
    description:
      "Dive into luxury with the Apple iPhone 15 Pro in Blue Titanium. Unleash powerful performance, stunning visuals, and abundant storage with 1TB, redefining excellence in smartphone technology.",
    price: 1500,
  },
  {
    id: 1,
    image: "/admin-ui/products/apple-iphone-15-pro-1tb-blue-titanium.png",
    name: "Phone",
    description:
      "Dive into luxury with the Apple iPhone 15 Pro in Blue Titanium. Unleash powerful performance, stunning visuals, and abundant storage with 1TB, redefining excellence in smartphone technology.",
    price: 1500,
  },
  {
    id: 1,
    image: "/admin-ui/products/apple-iphone-15-pro-1tb-blue-titanium.png",
    name: "Phone",
    description:
      "Dive into luxury with the Apple iPhone 15 Pro in Blue Titanium. Unleash powerful performance, stunning visuals, and abundant storage with 1TB, redefining excellence in smartphone technology.",
    price: 1500,
  },
  {
    id: 1,
    image: "/admin-ui/products/apple-iphone-15-pro-1tb-blue-titanium.png",
    name: "Phone",
    description:
      "Dive into luxury with the Apple iPhone 15 Pro in Blue Titanium. Unleash powerful performance, stunning visuals, and abundant storage with 1TB, redefining excellence in smartphone technology.",
    price: 1500,
  },
  {
    id: 1,
    image: "/admin-ui/products/apple-iphone-15-pro-1tb-blue-titanium.png",
    name: "Phone",
    description:
      "Dive into luxury with the Apple iPhone 15 Pro in Blue Titanium. Unleash powerful performance, stunning visuals, and abundant storage with 1TB, redefining excellence in smartphone technology.",
    price: 1500,
  },
  {
    id: 1,
    image: "/admin-ui/products/apple-iphone-15-pro-1tb-blue-titanium.png",
    name: "Phone",
    description:
      "Dive into luxury with the Apple iPhone 15 Pro in Blue Titanium. Unleash powerful performance, stunning visuals, and abundant storage with 1TB, redefining excellence in smartphone technology.",
    price: 1500,
  },
  {
    id: 1,
    image: "/admin-ui/products/apple-iphone-15-pro-1tb-blue-titanium.png",
    name: "Phone",
    description:
      "Dive into luxury with the Apple iPhone 15 Pro in Blue Titanium. Unleash powerful performance, stunning visuals, and abundant storage with 1TB, redefining excellence in smartphone technology.",
    price: 1500,
  },
];

const Products = () => {
  const isLoading = false;

  if (isLoading) {
    return <ProductsSkeleton />;
  }

  return (
    <section className="common-container flex flex-col 2xl:flex-row gap-8 2xl:gap-20">
      {/* Filtering */}
      <ProductsFilter />

      {/* products */}
      <div className="flex-1 mt-8">
        <p className="text-[15px] md:text-[18px] font-semibold mb-8">
          Showing 1 - 9 of 15 products
        </p>

        {/* Grid Sys */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {mockProducts.map((product, index) => (
            <li key={`product-${index}`}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>

        <div className="flex justify-center items-center gap-3 mt-8">
          <button
            className="border border-gray p-2 disabled:opacity-60"
            disabled={true}
          >
            <img
              className="w-8 h-8"
              src={"/assets/icons/arrow-left.svg"}
              alt=""
            />
          </button>

          <span className="small">Page 1 of 2</span>

          <button className="border border-gray p-2 disabled:opacity-60">
            <img
              className="w-8 h-8"
              src={"/assets/icons/arrow-right.svg"}
              alt=""
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Products;
