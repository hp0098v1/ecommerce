import { Outlet } from "react-router-dom";

import Header from "@/components/shared/RootLayout/Header";
import Footer from "@/components/shared/RootLayout/Footer";
import Inclusions from "@/components/shared/RootLayout/Inclusions";

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Inclusions />
      <Footer />
    </>
  );
};

export default RootLayout;
