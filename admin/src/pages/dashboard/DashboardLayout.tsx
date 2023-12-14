import { Navigate, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const isAuthenticated = true;

  return <>{isAuthenticated ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

export default DashboardLayout;
