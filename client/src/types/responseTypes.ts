import { TUser, TProduct, TCategory } from "./index";

export type TLoginResponse = {
  accessToken: string;
  user: TUser;
};

export type TGetProductsResponse = {
  products: TProduct[];
  totalPages: number;
  totalProducts: number;
  currentPage: number;
};

export type TGetProductByIdResponse = {
  product: TProduct;
};

export type TGetCategoriesResponse = {
  categories: TCategory[];
};
