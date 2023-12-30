import { TCartItem } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TCartStore = {
  cartId: string | null;
  userId: string | null;
  products: TCartItem[];
  grandTotal: number;
  addItem: (updatedCart: TCartItem[], grandTotal: number) => void;
  updateCart: (updatedCart: TCartItem[], grandTotal: number) => void;
  removeItem: (pdatedCart: TCartItem[], grandTotal: number) => void;
  clearCart: () => void;
  setCart: (
    cartId: string,
    userId: string,
    products: TCartItem[],
    grandTotal: number
  ) => void;
};

export const useCartStore = create<TCartStore>()(
  persist(
    (set) => ({
      cartId: null,
      userId: null,
      products: [],
      grandTotal: 0,
      addItem: (updatedCart, grandTotal) => {
        set((state) => ({
          ...state,
          products: updatedCart,
          grandTotal,
        }));
      },
      updateCart: (updatedCart, grandTotal) => {
        set((state) => ({ ...state, products: updatedCart, grandTotal }));
      },
      removeItem: (updatedCart, grandTotal) => {
        set((state) => ({
          ...state,
          products: updatedCart,
          grandTotal,
        }));
      },
      clearCart: () => {
        set({ cartId: null, userId: null, products: [], grandTotal: 0 });
      },
      setCart: (
        cartId: string,
        userId: string,
        products: TCartItem[],
        grandTotal: number
      ) => {
        set({ cartId, userId, products, grandTotal });
      },
    }),
    {
      name: "cart",
    }
  )
);
