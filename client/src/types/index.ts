export type TCategory = {
  _id: string;
  name: string;
  imageUrl: string;
};

export type TProduct = {
  _id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  inStuck: boolean;
  categoryId: string | TCategory;
};

export type TUser = {
  _id: string;
  username: string;
  email: string;
};

export type TCartItem = {
  productId: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  subtotal: number;
};

export type TCart = {
  _id: string;
  userId: string;
  products: TCartItem[];
  grandTotal: number;
};
