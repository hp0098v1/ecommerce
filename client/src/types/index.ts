export type Category = {
  _id: string;
  name: string;
  imageUrl: string;
};

export type Product = {
  _id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  inStuck: boolean;
  categoryId: string | Category;
};

export type User = {
  _id: string;
  username: string;
  email: string;
};

export type CartItem = {
  productId: string;
  name: string;
  imageUrl: string;
  price: number;
  quantity: number;
  subtotal: number;
};

export type Cart = {
  _id: string;
  userId: string;
  products: CartItem[];
  grandTotal: number;
};

export type LoginResponse = {
  accessToken: string;
  user: User;
};
