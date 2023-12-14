import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
  return (
    <section className="common-container flex flex-col md:flex-row gap-8 mb-20">
      {/* Image */}
      <Skeleton className="h-[260px] md:flex-1 lg:h-[320px]" />

      {/* Content */}
      <div className="flex flex-col md:flex-1">
        <Skeleton className="h-12" />
        <Skeleton className="h-6 mt-1 w-1/2" />

        <div className="my-6">
          <Skeleton className="h-10 w-1/2 mb-2" />
          <Skeleton className="h-6 mb-1" />
          <Skeleton className="h-6 mb-1" />
          <Skeleton className="h-6 mb-1" />
          <Skeleton className="h-6" />
        </div>
        <Skeleton className="h-16" />
      </div>
    </section>
  );
};

export default ProductSkeleton;
