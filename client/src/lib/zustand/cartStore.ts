import { TCartItem } from "@/types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type TCartStore = {
  userId: string | null;
  products: TCartItem[];
  grandTotal: number;
  addItem: (item: TCartItem) => void;
  updateItem: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
};

export const useCartStore = create<TCartStore>()(
  persist(
    (set, get) => ({
      userId: null,
      products: [],
      grandTotal: 0,
      addItem: (item: TCartItem) => {
        const isExistingItem = get().products.includes(item);

        if (isExistingItem) {
          console.log("Item already in cart");
        }

        const updatedProducts = [...get().products, item];
        const grandTotal = updatedProducts.reduce(
          (acc, cur) => acc + cur.subtotal,
          0
        );

        set((state) => ({
          ...state,
          products: updatedProducts,
          grandTotal,
        }));
      },
      updateItem: (productId: string, quantity: number) => {
        const isExistingItem = get().products.find(
          (item) => item.productId === productId
        );

        if (!isExistingItem) {
          console.log("Item does not exit");
        }

        const updatedProducts = get().products.map((item) =>
          item.productId === productId
            ? { ...item, quantity, subtotal: item.price * quantity }
            : item
        );
        const grandTotal = updatedProducts.reduce(
          (acc, cur) => acc + cur.subtotal,
          0
        );

        set((state) => ({ ...state, products: updatedProducts, grandTotal }));
      },
      removeItem: (productId: string) => {
        const updatedProducts = get().products.filter(
          (item) => item.productId !== productId
        );

        const grandTotal = updatedProducts.reduce(
          (acc, cur) => acc + cur.subtotal,
          0
        );

        set((state) => ({
          ...state,
          products: updatedProducts,
          grandTotal,
        }));
      },
    }),
    {
      name: "cart",
    }
  )
);
