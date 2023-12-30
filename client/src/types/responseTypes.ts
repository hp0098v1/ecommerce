import { AxiosError } from "axios";
import { TUser, TProduct, TCategory, TCart } from "./index";

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

/* -------------------------------------------------------------------------- */
/*                               Auth Responses                               */
/* -------------------------------------------------------------------------- */
export type TLoginResponse = {
  accessToken: string;
  user: TUser;
};

/* -------------------------------------------------------------------------- */
/*                               User Responses                               */
/* -------------------------------------------------------------------------- */
export type TUserResponse = {
  user: TUser;
};

/* -------------------------------------------------------------------------- */
/*                               Cart Responses                               */
/* -------------------------------------------------------------------------- */
export type TGetCartResponse = {
  cart: TCart;
};

export type TCreateCartResponse = TGetCartResponse;
export type TUpdateCartResponse = TGetCartResponse;

// Axios Error
export type TAxiosErrorResponse = AxiosError<{
  status: number;
  message: string;
}>;
