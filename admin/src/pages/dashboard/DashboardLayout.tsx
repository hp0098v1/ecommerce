import { Navigate, Outlet } from "react-router-dom";

import Nav from "@/components/shared/dash-layout/Nav";

const DashboardLayout = () => {
  const isAuthenticated = true;

  return (
    <>
      {isAuthenticated ? (
        <>
          <Nav />
          <Outlet />
        </>
      ) : (
        <Navigate to={"/login"} />
      )}
    </>
  );
};

export default DashboardLayout;
