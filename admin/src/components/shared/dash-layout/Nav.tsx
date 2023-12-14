import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Folder,
  LayoutGrid,
  LayoutList,
  Menu,
  ShoppingBasket,
  Users,
  X,
} from "lucide-react";
import ThemeToggler from "../ThemeToggler";

const Nav = () => {
  const [nav, setNav] = useState(true);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= 1024) {
        setNav(true);
      } else {
        setNav(false);
      }
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const menuItems = [
    { icon: <LayoutGrid className="mr-4" />, text: "Dashboard" },
    { icon: <ShoppingBasket className="mr-4" />, text: "Products" },
    { icon: <LayoutList className="mr-4" />, text: "Categories" },
    { icon: <Users className="mr-4" />, text: "Users" },
    { icon: <Folder className="mr-4" />, text: "Storage" },
  ];

  return (
    <div className="max-w-[1640px] bg-nav-background  mx-auto flex justify-between items-center p-4 shadow-sm">
      {/* Left side */}
      <div className="flex justify-between items-center w-full">
        <div onClick={() => setNav(!nav)} className="cursor-pointer lg:hidden">
          <Menu />
        </div>
        <h1 className="section-title ml-2">Teach Heaven</h1>

        <ThemeToggler />
      </div>

      {/* Side drawer menu */}
      <div
        className={
          nav
            ? "fixed top-0 left-0 w-[300px] h-screen bg-nav-background backdrop-blur-sm shadow-md z-10 duration-300 lg:duration-0 lg:shadow-none"
            : "fixed top-0 left-[-100%] w-[300px] h-screen bg-nav-background backdrop-blur-sm shadow-md z-10 duration-300 lg:duration-0 lg:shadow-none"
        }
      >
        <div className="flex items-center justify-between p-4">
          <h1 className="section-title">Teach Heaven</h1>
          <X
            onClick={() => setNav(!nav)}
            className="cursor-pointer lg:hidden"
          />
        </div>
        <nav>
          <ul className="flex flex-col p-4">
            {menuItems.map(({ icon, text }, index) => {
              return (
                <div key={index} className="py-2">
                  <li>
                    <Link
                      className="text-xl flex items-center cursor-pointer rounded-md mx-auto p-4 hover:text-background hover:bg-foreground"
                      to={"/"}
                    >
                      {icon} {text}
                    </Link>
                  </li>
                </div>
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Nav;
