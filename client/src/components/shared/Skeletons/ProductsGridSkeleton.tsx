import { Skeleton } from "@/components/ui/skeleton";

const ProductsGridSkeleton = () => {
  return (
    <>
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
    </>
  );
};

export default ProductsGridSkeleton;
