import { useGetMe, useLogout } from "@/lib/react-query/queries";
import { useAuthStore } from "@/lib/zustand";
import { Link, Navigate, Outlet } from "react-router-dom";

const mockList = [
  {
    path: "/account",
    icon: "/assets/icons/user.svg",
    title: "Personal Information",
  },
  {
    path: "/account",
    icon: "/assets/icons/purchases.svg",
    title: "My Purchases",
  },
  {
    path: "/account",
    icon: "/assets/icons/orders.svg",
    title: "My Orders",
  },
];

const AccountLayout = () => {
  // Zustand
  const { isLoggedIn } = useAuthStore();

  // React Query
  const { mutate } = useLogout();
  const { data } = useGetMe();

  const user = data?.user;

  // Handlers
  const logoutHandler = () => {
    mutate();
  };

  return isLoggedIn ? (
    <div className="common-container mt-12">
      <h3 className="h3-semibold mb-12">My Profile</h3>
      <div className="grid gap-8 grid-cols-1 md:grid-cols-[30%_1fr]">
        {/* Page Layout */}
        <div className="border border-[#f3f3f3] divide-y divide-[#f3f3f3]">
          {/* Personal Info */}
          <div className="flex items-center gap-3 p-6 overflow-hidden whitespace-nowrap text-ellipsis">
            <img src="/assets/icons/profile.svg" alt="profile" />

            <div>
              <p className="text-[15px] lg:text-[18px] font-semibold">
                {user?.username}
              </p>
              <p className="text-[16px]">{user?.email}</p>
            </div>
          </div>
          {/* Navigation */}
          <ul className="flex flex-col divide-y divide-[#f3f3f3]">
            {mockList.map((link) => (
              <li key={link.title}>
                <Link to={link.path} className="flex items-center gap-3 p-6">
                  <img className="w-6" src={link.icon} alt="" />
                  <p>{link.title}</p>
                </Link>
              </li>
            ))}

            <li>
              <button
                onClick={logoutHandler}
                className="flex items-center gap-3 p-6"
              >
                <img className="w-6" src="/assets/icons/logout.svg" alt="" />
                <p>Logout</p>
              </button>
            </li>
          </ul>
        </div>

        {/* Page Outlet */}
        <section>
          <Outlet />
        </section>
      </div>
    </div>
  ) : (
    <Navigate to={"/"} />
  );
};

export default AccountLayout;
