import { axiosApi } from "../axios";
import { Category, Product } from "@/types";

export const getCategories = async (): Promise<Category[]> => {
  const res = await axiosApi.get<{ categories: Category[] }>("/categories");
  const data = res.data;

  return data.categories;
};

type GetProductsData = {
  products: Product[];
  totalPages: number;
  totalProducts: number;
  currentPage: number;
};

export const getProducts = async (
  page: number,
  limit: number,
  pupulate: string
): Promise<GetProductsData> => {
  const res = await axiosApi.get<GetProductsData>("/products", {
    params: {
      page,
      limit,
      pupulate,
    },
  });
  const data = res.data;

  return data;
};

export const getProduct = async (
  productId: string,
  populate: string
): Promise<Product> => {
  const res = await axiosApi.get<{ product: Product }>(
    "/products/" + productId,
    {
      params: {
        populate,
      },
    }
  );
  const data = res.data;

  return data.product;
};
