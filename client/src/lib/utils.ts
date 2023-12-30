import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

import { TCartItem } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mergeProducts(arr1: TCartItem[], arr2: TCartItem[]) {
  const mergedArray = [...arr1];

  arr2.forEach((item) => {
    const existingItem = mergedArray.find(
      (i) => i.productId === item.productId
    );

    if (existingItem) {
      existingItem.quantity = existingItem.quantity + item.quantity;
    } else {
      mergedArray.push(item);
    }
  });

  return mergedArray;
}

/* -------------------------------------------------------------------------- */
/*                              Cart Store Utils                              */
/* -------------------------------------------------------------------------- */
export const addToCart = (
  cart: TCartItem[],
  item: TCartItem
): [TCartItem[], number] => {
  const isExistingItem = cart.includes(item);

  if (isExistingItem) {
    console.log("Item already in cart");
  }

  const updatedCart = [...cart, item];
  const grandTotal = updatedCart.reduce((acc, cur) => acc + cur.subtotal, 0);

  return [updatedCart, grandTotal];
};

export function updateCartItem(
  cart: TCartItem[],
  productId: string,
  quantity: number
): [TCartItem[], number] {
  const isExistingItem = cart.find((item) => item.productId === productId);

  if (!isExistingItem) {
    console.log("Item does not exit");
  }

  const updatedProducts = cart.map((item) =>
    item.productId === productId
      ? { ...item, quantity, subtotal: item.price * quantity }
      : item
  );

  const grandTotal = updatedProducts.reduce(
    (acc, cur) => acc + cur.subtotal,
    0
  );

  return [updatedProducts, grandTotal];
}

export function removeCartItem(
  cart: TCartItem[],
  productId: string
): [TCartItem[], number] {
  const updatedProducts = cart.filter((item) => item.productId !== productId);

  const grandTotal = updatedProducts.reduce(
    (acc, cur) => acc + cur.subtotal,
    0
  );

  return [updatedProducts, grandTotal];
}
