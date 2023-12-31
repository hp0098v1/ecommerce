import { useState } from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAuthStore, useCartStore, useFiltersStore } from "@/lib/zustand";

const Header = () => {
  // States
  const [isHumbergerOpened, setIsHumbergerOpened] = useState(false);

  // Zustand
  const { isLoggedIn } = useAuthStore();
  const { products } = useCartStore();
  const { setCategories } = useFiltersStore();

  // Handlers
  const toggleMenuHandler = () => {
    setIsHumbergerOpened((prev) => !prev);
  };

  const setEmptyCategories = () => setCategories([]);

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
        <Link onClick={setEmptyCategories} to={"/products"}>
          Shop
        </Link>
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
            {!isLoggedIn && (
              <>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link onClick={setEmptyCategories} to={"/products"}>
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to={"/login"}>Login</Link>
                </li>
                <li>
                  <Link to={"/create-account"}>Create Account</Link>
                </li>
              </>
            )}

            {isLoggedIn && (
              <>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link onClick={setEmptyCategories} to={"/products"}>
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to={"/account"}>Account</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
