import { axiosApi } from "../axios";
import { TProduct } from "@/types";
import {
  TGetCategoriesResponse,
  TGetProductByIdResponse,
  TGetProductsResponse,
} from "@/types/responseTypes";

export const getCategories = async (): Promise<TGetCategoriesResponse> => {
  const res = await axiosApi.get<TGetCategoriesResponse>("/categories");
  const data = res.data;

  return data;
};

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
