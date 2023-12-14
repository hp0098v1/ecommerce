import { Skeleton } from "@/components/ui/skeleton";

const CartSkeleton = () => {
  return (
    <section className="common-container mt-12">
      <Skeleton className="h-8 w-40 mb-8" />

      <div className="grid items-start gap-20 2xl:grid-cols-[65%_1fr] 2xl:gap-12 mb-8">
        <div>
          {/* Header */}
          <div className="hidden md:grid grid-cols-[100px_2fr_1fr] gap-4 w-full mb-2 font-semibold">
            <Skeleton className="h-6 w-32" />
            <div className="grid grid-cols-4">
              <p></p>
              <p></p>
              <p></p>
              <Skeleton className="h-6 w-32" />
            </div>
            <Skeleton className="h-6 w-32" />
          </div>
          {/* Cart Items */}
          <div className="py-8 border-y border-[#f3f3f3]">
            {Array.from(Array(4).keys()).map((i) => (
              <div
                className="grid grid-cols-[100px_2fr_1fr] gap-4 mb-4"
                key={`cart-item-${i}`}
              >
                <Skeleton className="w-20 h-20" />
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 md:items-center  md:justify-between">
                  <div className="w-full overflow-hidden whitespace-nowrap text-ellipsis">
                    <Skeleton className="h-8 w-64 mb-2" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                  <div className="justify-self-start md:justify-self-end flex justify-between items-center w-[100px] p-1 rounded-lg border animate-pulse border-[#f3f3f3]">
                    <Skeleton className="w-5 h-5 md:w-8 md:h-8 " />
                    <Skeleton className="w-5 h-5 md:w-8 md:h-8" />
                    <Skeleton className="w-5 h-5 md:w-8 md:h-8 " />
                  </div>
                </div>
                <div className="flex flex-col gap-8 justify-between items-end  md:flex-row  md:items-center  md:justify-end">
                  <Skeleton className="h-6 w-16 md:w-32" />
                  <Skeleton className="w-8 h-8 " />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Summary */}
        <div className="space-y-4 border border-[#f3f3f3] p-4">
          <div className="border-b border-[#f3f3f3] p-3">
            <Skeleton className="w-32 h-6" />
          </div>

          <div className="flex items-center justify-between border-b border-[#f3f3f3] p-3">
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-32 h-6" />
          </div>
          <div className="flex items-center justify-between border-b border-[#f3f3f3] p-3">
            <Skeleton className="w-32 h-6" />
            <Skeleton className="w-32 h-6" />
          </div>
          <Skeleton className="h-16 rounded-lg" />
        </div>
      </div>

      {/* Continue Shopping */}
      <Skeleton className="flex flex-col gap-8 lg:gap-16 lg:flex-row lg:justify-between lg:items-center bg-muted-foreground p-8 lg:p-16 mt-32">
        <div className="flex-1">
          <Skeleton className="h-10 w-48 mb-2" />
          <Skeleton className="h-6  mb-1" />
          <Skeleton className="h-6  mb-1" />
          <Skeleton className="h-6 " />
        </div>
        <Skeleton className="h-14 w-60 rounded-lg" />
      </Skeleton>
    </section>
  );
};

export default CartSkeleton;
