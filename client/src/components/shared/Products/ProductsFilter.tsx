import { Checkbox } from "../../ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../../ui/radio-group";

const mockCategories = [
  "Laptops",
  "Ipads",
  "Phones",
  "Watches",
  "TV & Home",
  "Accessories",
];

const mockSort = ["Latest", "Oldest"];

const ProductsFilter = () => {
  return (
    <div className="flex flex-col gap-4 md:gap-8 min-w-[240px] 2xl:mt-8">
      {/* Categories */}
      <div className="flex flex-col gap-4">
        <h5 className="text-[15px] md:text-[18px] font-semibold">
          Product Categories
        </h5>

        <ul className="flex flex-col md:flex-row md:items-center 2xl:flex-col 2xl:items-stretch gap-3 ">
          {mockCategories.map((cate) => (
            <li key={cate}>
              <label
                className="text[15px] md:text-[18px] text-[#131118] break-keep font-normal flex items-center gap-2 p-1"
                htmlFor={cate}
              >
                <Checkbox id={cate} />
                <span>{cate}</span>
              </label>
            </li>
          ))}
        </ul>
      </div>
      {/* Sort By */}
      <div className="flex flex-col gap-4">
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
      </div>
    </div>
  );
};

export default ProductsFilter;
