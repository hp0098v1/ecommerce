import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Cart, CartItem } from "@/types";

type CartStore = {
  _id: string | null;
  userId: string | null;
  products: CartItem[];
  grandTotal: number;
  addProduct: (
    productId: string,
    price: number,
    quantity: number,
    name: string,
    imageUrl: string
  ) => void;
  incQuantity: (productId: string) => void;
  decQuantity: (productId: string) => void;
  deleteProduct: (productId: string) => void;
  getFromRest: (cart: Cart) => void;
  clearCart: () => void;
};

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      _id: null,
      userId: null,
      products: [],
      grandTotal: 0,
      addProduct: (
        productId: string,
        price: number,
        quantity: number,
        name: string,
        imageUrl: string
      ) => {
        const products = get().products;
        const isExistsInCart = products.find(
          (product) => product.productId === productId
        );

        if (isExistsInCart) {
          return console.log("Product already exists");
        }

        products.push({
          productId,
          price,
          quantity,
          subtotal: price * quantity,
          name,
          imageUrl,
        });

        set((state) => ({
          ...state,
          products: [...products],
          grandTotal: products.reduce((acc, curr) => acc + curr.subtotal, 0),
        }));
      },
      incQuantity: (productId: string) => {
        const products = get().products;
        const updatedProducts = products.map((product) =>
          product.productId === productId
            ? {
                ...product,
                quantity: product.quantity + 1,
                subtotal: product.subtotal + product.price,
              }
            : product
        );

        set((state) => ({
          ...state,
          products: [...updatedProducts],
          grandTotal: updatedProducts.reduce(
            (acc, curr) => acc + curr.subtotal,
            0
          ),
        }));
      },
      decQuantity: (productId: string) => {
        const products = get().products;
        const updatedProducts = products.map((product) =>
          product.productId === productId
            ? {
                ...product,
                quantity: product.quantity - 1,
                subtotal: product.subtotal - product.price,
              }
            : product
        );

        set((state) => ({
          ...state,
          products: [...updatedProducts],
          grandTotal: updatedProducts.reduce(
            (acc, curr) => acc + curr.subtotal,
            0
          ),
        }));
      },
      deleteProduct: (productId: string) => {
        const products = get().products;
        const updatedProducts = products.filter(
          (item) => item.productId !== productId
        );

        set((state) => ({
          ...state,
          products: updatedProducts,
          grandTotal: updatedProducts.reduce(
            (acc, curr) => acc + curr.subtotal,
            0
          ),
        }));
      },
      getFromRest: (cart: Cart) => set((state) => ({ ...state, ...cart })),
      clearCart: () =>
        set((state) => ({
          ...state,
          _id: null,
          userId: null,
          products: [],
          grandTotal: 0,
        })),
    }),
    { name: "cart" }
  )
);
