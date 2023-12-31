import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "@/lib/zustand";

import Header from "@/components/shared/RootLayout/Header";
import Footer from "@/components/shared/RootLayout/Footer";
import Inclusions from "@/components/shared/RootLayout/Inclusions";

const RootLayout = () => {
  const { isLoggedIn } = useAuthStore();

  return isLoggedIn ? (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Inclusions />
      <Footer />
    </>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default RootLayout;
