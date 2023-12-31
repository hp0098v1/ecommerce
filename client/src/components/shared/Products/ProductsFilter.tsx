import { Checkbox } from "../../ui/checkbox";
import { useFiltersStore } from "@/lib/zustand";
import { useGetCategories } from "@/lib/react-query/queries";
import ProductsFilterSkeleton from "../Skeletons/ProductsFilterSkeleton";

const ProductsFilter = () => {
  const { categories: categoriesInStore, setCategories } = useFiltersStore();
  const { data, isLoading } = useGetCategories();

  const toggleCheckboxHandler = (categoryId: string) => {
    if (categoriesInStore.includes(categoryId)) {
      setCategories(categoriesInStore.filter((c) => c !== categoryId));
    } else {
      setCategories([...categoriesInStore, categoryId]);
    }
  };

  if (isLoading) return <ProductsFilterSkeleton />;

  return (
    <div className="flex flex-col gap-4 md:gap-8 min-w-[240px] 2xl:mt-8">
      {/* Categories */}
      <div className="flex flex-col gap-4">
        <h5 className="text-[15px] md:text-[18px] font-semibold">
          Product Categories
        </h5>

        <ul className="flex flex-col md:flex-row md:items-center 2xl:flex-col 2xl:items-stretch gap-3 ">
          {data?.categories.map((cate) => (
            <li key={`filters-category-${cate._id}`}>
              <label
                className="text[15px] md:text-[18px] text-[#131118] break-keep font-normal flex items-center gap-2 p-1"
                htmlFor={cate._id}
              >
                <Checkbox
                  checked={categoriesInStore.includes(cate._id)}
                  onCheckedChange={() => toggleCheckboxHandler(cate._id)}
                  id={cate._id}
                />
                <span>{cate.name}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      {/* Sort By */}
      {/* <div className="flex flex-col gap-4">
        <h5 className="text-[15px] md:text-[18px] font-semibold">Sort By</h5>

        <RadioGroup
          className="flex flex-col md:flex-row 2xl:flex-col gap-2"
          defaultValue={mockSort[0]}
        >
          {mockSort.map((sortText) => (
            <div key={sortText} className="flex items-center gap-3 p-2">
              <RadioGroupItem value={sortText} id={sortText} />
              <label
                className="text[15px] md:text-[18px] text-[#131118] break-keep font-normal"
                htmlFor={sortText}
              >
                {sortText}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div> */}
    </div>
  );
};

export default ProductsFilter;
