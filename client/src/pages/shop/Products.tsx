import ProductCard from "@/components/shared/Products/ProductCard";
import ProductsFilter from "@/components/shared/Products/ProductsFilter";
import ProductsGridSkeleton from "@/components/shared/Skeletons/ProductsGridSkeleton";

import { useGetProducts } from "@/lib/react-query/queries";
import { useFiltersStore } from "@/lib/zustand";

const Products = () => {
  const { page, setPage, limit } = useFiltersStore();

  const {
    data: productsResponse,
    isLoading: isGetProductsLoading,
    isError,
    error,
  } = useGetProducts();

  // Handlers
  const nextPageHandler = () => {
    setPage(page + 1);
  };

  const prevPageHandler = () => {
    setPage(page - 1);
  };

  if (isError) {
    return <div>Error: {error?.message}</div>;
  }

  const products = productsResponse?.products;
  const totalPages = productsResponse?.totalPages;
  const totalProducts = productsResponse?.totalProducts;

  return (
    <section className="common-container flex flex-col 2xl:flex-row gap-8 2xl:gap-20">
      {/* Filtering */}

      <ProductsFilter />

      {/* products */}
      {isGetProductsLoading ? (
        <ProductsGridSkeleton />
      ) : (
        <div className="flex-1 mt-8">
          <p className="text-[15px] md:text-[18px] font-semibold mb-8">
            Showing {page * limit - limit + 1} -
            {page === totalPages ? totalProducts : page * limit}
            &nbsp;of {totalProducts} products
          </p>

          {/* Grid Sys */}
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {products?.map((product, index) => (
              <li key={`product-${index}`}>
                <ProductCard product={product} />
              </li>
            ))}
          </ul>

          <div className="flex justify-center items-center gap-3 mt-8">
            <button
              onClick={prevPageHandler}
              className="border border-gray p-2 disabled:opacity-60"
              disabled={page === 1}
            >
              <img
                className="w-8 h-8"
                src={"/assets/icons/arrow-left.svg"}
                alt=""
              />
            </button>

            <span className="small">
              Page {page} of {totalPages}
            </span>

            <button
              onClick={nextPageHandler}
              className="border border-gray p-2 disabled:opacity-60"
              disabled={page === totalPages}
            >
              <img
                className="w-8 h-8"
                src={"/assets/icons/arrow-right.svg"}
                alt=""
              />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Products;
