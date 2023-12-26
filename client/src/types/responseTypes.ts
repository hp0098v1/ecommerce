import { AxiosError } from "axios";
import { TUser, TProduct, TCategory } from "./index";

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

// Axios Error
export type TAxiosErrorResponse = AxiosError<{
  status: number;
  message: string;
}>;
