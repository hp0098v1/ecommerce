import { RouterProvider, createBrowserRouter } from "react-router-dom";

import { DashboardLayout } from "./dashboard";
import { AuthLayout, Login } from "./auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardLayout />,
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [{ path: "login", element: <Login /> }],
  },
]);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
