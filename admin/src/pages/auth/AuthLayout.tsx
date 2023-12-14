import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;

  return (
    <>
      {isAuthenticated ? (
        <Navigate to={"/"} />
      ) : (
        <main className="grid grid-cols-1 lg:grid-cols-2 min-h-screen ">
          <div className="hidden lg:block lg:h-full lg:bg-[url('/assets/auth-bg.svg')] lg:bg-no-repeat lg:bg-cover lg:bg-center"></div>
          <Outlet />
        </main>
      )}
    </>
  );
};

export default AuthLayout;
