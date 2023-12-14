import { Skeleton } from "@/components/ui/skeleton";

const ProductsSkeleton = () => {
  return (
    <section className="common-container flex flex-col 2xl:flex-row gap-8 2xl:gap-20">
      {/* Filtering Section */}
      <div className="flex flex-col gap-4 md:gap-8 min-w-[240px] 2xl:mt-8">
        <div className="flex flex-col gap-4">
          <h5 className="text-[15px] md:text-[18px] font-semibold">
            Product Categories
          </h5>

          {/* Categories Skeleton */}
          <div className="flex flex-col md:flex-row md:items-center 2xl:flex-col 2xl:items-stretch gap-3 ">
            {Array.from(Array(6).keys()).map((i) => (
              <div
                className="flex items-center gap-2"
                key={`products-category-${i}`}
              >
                <Skeleton className="h-7 w-7" />
                <Skeleton className="h-5 w-[100px]" />
              </div>
            ))}
          </div>

          {/* Sort By Skeleton */}
          <div className="flex flex-col gap-4">
            <h5 className="text-[15px] md:text-[18px] font-semibold">
              Sort By
            </h5>

            <div className="flex flex-col md:flex-row 2xl:flex-col gap-2">
              {Array.from(Array(2).keys()).map((i) => (
                <div
                  className="flex items-center gap-3 p-2"
                  key={`products-filter-${i}`}
                >
                  <Skeleton className="h-7 w-7 rounded-full" />
                  <Skeleton className="h-5 w-[100px]" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="flex-1 mt-8">
        <Skeleton className="w-64 h-8 mb-8" />

        {/* Grid Sys */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {Array.from(Array(6).keys()).map((i) => (
            <div className="space-y-4" key={`products-grid-card-${i}`}>
              <Skeleton className="h-64" />
              <Skeleton className="h-6" />
              <Skeleton className="h-3" />
              <Skeleton className="h-3" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSkeleton;
