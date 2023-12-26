import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import {
  HAMBURGER_MENU_LINKS,
  HAMBURGER_MENU_LINKS_PRIVATE,
} from "@/constants";
import { useAuthStore } from "@/lib/zustand/authStore";
import { useCartStore } from "@/lib/zustand/cartStore.ts";

const Header = () => {
  const { isLoggedIn } = useAuthStore();
  const { products } = useCartStore();
  const [isHumbergerOpened, setIsHumbergerOpened] = useState(false);

  const toggleMenuHandler = () => {
    setIsHumbergerOpened((prev) => !prev);
  };

  return (
    <header className="common-container flex items-center justify-between py-8">
      <Link to={"/"}>
        <img
          className="h-6 md:h-7"
          src="/assets/images/logo-black.svg"
          alt="logo"
        />
      </Link>

      {/* Desktop */}
      <div className="hidden md:flex gap-6 items-center text-gray-600">
        <Link to={"/"}>Home</Link>
        <Link to={"/products"}>Shop</Link>
        {isLoggedIn ? (
          <Link to={"/account"}>
            <img src="/assets/icons/user.svg" alt="" />
          </Link>
        ) : (
          <Button>
            <Link to={"/login"}>Login</Link>
          </Button>
        )}

        <Link to={"/cart"} className="flex items-center">
          <img className="w-6 h-6" src="/assets/icons/cart.svg" alt="cart" />
          <span>({products.length})</span>
        </Link>
      </div>

      {/* Mobile */}
      <div className="flex items-center gap-2 md:hidden">
        <Link to={"/cart"} className="flex items-center">
          <img className="w-6 h-6" src="/assets/icons/cart.svg" alt="cart" />
        </Link>
        <div className="hamburger-menu">
          <button
            onClick={toggleMenuHandler}
            className="hamburger-menu__trigger"
          >
            <img
              src={
                isHumbergerOpened
                  ? "/assets/icons/close.svg"
                  : "/assets/icons/menu.svg"
              }
              alt="menu trigger"
            />
          </button>

          <ul
            className={`hamburger-menu__list ${
              isHumbergerOpened ? "flex" : "hidden"
            }`}
          >
            {!isLoggedIn &&
              HAMBURGER_MENU_LINKS.map((item) => (
                <li key={`hamburger-menu-link-${item.title}`}>
                  <Link to={item.path}>{item.title}</Link>
                </li>
              ))}

            {isLoggedIn &&
              HAMBURGER_MENU_LINKS_PRIVATE.map((item) => (
                <li key={`hamburger-menu-link-private-${item.title}`}>
                  <Link to={item.path}>{item.title}</Link>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
