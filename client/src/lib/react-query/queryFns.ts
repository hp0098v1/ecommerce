import { axiosApi, axiosApiWithAuth } from "../axios";
import {
  TGetCategoriesResponse,
  TGetProductByIdResponse,
  TGetProductsResponse,
  TLoginResponse,
  TUserResponse,
} from "@/types/responseTypes";

/* -------------------------------------------------------------------------- */
/*                                 Categories                                 */
/* -------------------------------------------------------------------------- */
export const getCategories = async (): Promise<TGetCategoriesResponse> => {
  const res = await axiosApi.get<TGetCategoriesResponse>("/categories");
  const data = res.data;

  return data;
};

/* -------------------------------------------------------------------------- */
/*                                  Products                                  */
/* -------------------------------------------------------------------------- */
export const getProducts = async (
  page: number,
  limit: number,
  pupulate: string
): Promise<TGetProductsResponse> => {
  const res = await axiosApi.get<TGetProductsResponse>("/products", {
    params: {
      page,
      limit,
      pupulate,
    },
  });
  const data = res.data;

  return data;
};

export const getProductById = async (
  productId: string,
  populate: string
): Promise<TGetProductByIdResponse> => {
  const res = await axiosApi.get<TGetProductByIdResponse>(
    "/products/" + productId,
    {
      params: {
        populate,
      },
    }
  );
  const data = res.data;

  return data;
};

/* -------------------------------------------------------------------------- */
/*                               Auth Functions                               */
/* -------------------------------------------------------------------------- */
export const register = async (data: {
  username: string;
  email: string;
  password: string;
}): Promise<TLoginResponse> => {
  const res = await axiosApiWithAuth.post<TLoginResponse>(
    "/users/register",
    data
  );
  return res.data;
};

export const login = async (data: {
  email: string;
  password: string;
}): Promise<TLoginResponse> => {
  const res = await axiosApiWithAuth.post<TLoginResponse>("/users/login", data);
  return res.data;
};

export const logout = async () => {
  await axiosApiWithAuth.get("/users/logout");
};

/* -------------------------------------------------------------------------- */
/*                               User Functions                               */
/* -------------------------------------------------------------------------- */
export const getMe = async (): Promise<TUserResponse> => {
  const res = await axiosApiWithAuth.get<TUserResponse>("/users/me");
  return res.data;
};
