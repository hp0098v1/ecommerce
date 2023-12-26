import { Link } from "react-router-dom";
import { Button } from "../../ui/button";
import { useGetCategories } from "@/lib/react-query/queries";
import { IMAGE_BASE_URL } from "@/constants";

const Categories = () => {
  const { data, isLoading, isError, error } = useGetCategories();

  if (isError) return <div>Error: {error.message}</div>;

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="common-container flex flex-col gap-8 mt-20 mb-16 md:mt-32">
      <div className="flex justify-between">
        <h3 className="h3-normal">Shop by Categories</h3>
        <Link to={"/products"}>Show All</Link>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {data?.categories?.map((cate) => (
          <li key={cate.name}>
            <Link
              to={"/products"}
              className="relative flex flex-col p-4 bg-gray"
            >
              <img
                className="relative"
                src={IMAGE_BASE_URL + cate.imageUrl}
                alt=""
              />
              <Button className="absolute bottom-8 w-[90%]  bg-white text-foreground md:py-8">
                {cate.name}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
