import { useQuery } from "@tanstack/react-query";
import QUERY_KEYS from "./queryKeys";
import { getCategories, getProduct, getProducts } from "./queryFns";

export const useGetCategories = () =>
  useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: getCategories,
  });

export const useGetProducts = (page = 1, limit = 9, populate = "") =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, page, limit],
    queryFn: () => getProducts(page, limit, populate),
  });

export const useGetProduct = (productId: string, populate = "") =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, productId],
    queryFn: () => getProduct(productId, populate),
  });
