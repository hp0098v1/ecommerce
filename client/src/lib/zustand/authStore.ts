import { User } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type AuthStore = {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  login: (user: User, accessToken: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isLoggedIn: false,
      login: (user, accessToken) =>
        set({ user, accessToken, isLoggedIn: true }),
      logout: () => set({ user: null, accessToken: null, isLoggedIn: false }),
    }),
    {
      name: "auth",
    }
  )
);
