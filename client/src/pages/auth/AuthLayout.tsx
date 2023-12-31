import { useAuthStore } from "@/lib/zustand";
import { Link, Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const { isLoggedIn } = useAuthStore();

  return isLoggedIn ? (
    <Navigate to={"/"} />
  ) : (
    <section className="flex flex-col lg:flex-row lg:w-full items-center h-screen min-h-screen overflow-auto bg-[url('/assets/images/image-1.svg')] bg-no-repeat bg-cover bg-center lg:bg-none px-8 lg:px-0">
      <Link
        className="lg:w-1/2 lg:h-full lg:bg-[url('/assets/images/image-1.svg')] lg:bg-no-repeat lg:bg-cover lg:bg-center"
        to={"/"}
      >
        <img
          className="h-12 my-12 mx-auto lg:m-8"
          src="/assets/images/logo-black.svg"
        />
      </Link>
      <div className="bg-white/90 mb-8 w-full max-w-2xl p-8 sm:p-12 rounded-lg lg:w-1/2 lg:mx-auto">
        <Outlet />
      </div>
    </section>
  );
};

export default AuthLayout;
