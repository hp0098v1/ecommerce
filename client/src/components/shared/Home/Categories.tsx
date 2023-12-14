import { Link } from "react-router-dom";
import { Button } from "../../ui/button";

const mockCategories = [
  {
    title: "Laptops",
    icon: "/admin-ui/categories/laptops-category.png",
  },
  {
    title: "Ipads",
    icon: "/admin-ui/categories/ipads-category.png",
  },
  {
    title: "Phones",
    icon: "/admin-ui/categories/phones-category.png",
  },
  {
    title: "Tv & Home",
    icon: "/admin-ui/categories/tv-home-category.png",
  },
  {
    title: "Watches",
    icon: "/admin-ui/categories/watches-category.png",
  },
  {
    title: "Accessories",
    icon: "/admin-ui/categories/accessories-category.png",
  },
];

const Categories = () => {
  return (
    <section className="common-container flex flex-col gap-8 mt-20 mb-16 md:mt-32">
      <div className="flex justify-between">
        <h3 className="text-[26px] lg:text-[32px] font-normal">
          Shop by Categories
        </h3>
        <Link to={"/products"}>Show All</Link>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {mockCategories.map((cate) => (
          <li key={cate.title}>
            <Link
              to={"/products"}
              className="relative flex flex-col p-4 bg-gray"
            >
              <img className="relative" src={cate.icon} alt="" />
              <Button className="absolute bottom-8 w-[90%]  bg-white text-foreground md:py-8">
                {cate.title}
              </Button>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Categories;
