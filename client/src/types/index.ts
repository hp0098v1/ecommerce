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
