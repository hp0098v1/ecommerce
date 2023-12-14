import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Home, Products, Product, RootLayout, Cart } from "./shop";
import { AuthLayout, CreateAccount, Login } from "./auth";
import { Account, AccountLayout } from "./account";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "products", element: <Products /> },
      { path: "products/:id", element: <Product /> },
      { path: "cart", element: <Cart /> },
      {
        path: "/account",
        element: <AccountLayout />,
        children: [{ index: true, element: <Account /> }],
      },
    ],
  },
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <Login /> },
      { path: "create-account", element: <CreateAccount /> },
    ],
  },
]);

const Root = () => {
  return <RouterProvider router={router} />;
};

export default Root;
