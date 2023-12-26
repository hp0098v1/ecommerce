import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosApiWithAuth } from "@/lib/axios";
import QUERY_KEYS from "./queryKeys";
import { getCategories, getProduct, getProducts } from "./queryFns";
import { Cart, CartItem, LoginResponse, User } from "@/types";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { useAuthStore } from "../zustand/authStore";
import { useCartStore } from "@/lib/zustand/cartStore.ts";

export const useLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login } = useAuthStore();
  const { addProduct, products, grandTotal } = useCartStore();
  const { data, isError, isSuccess, isLoading, refetch } = useGetCart();
  const { mutate: mutateCreateCart } = useCreateCart();
  const { mutate: mutateUpdateCart } = useUpdateCart();

  useEffect(() => {
    if (isLoading) {
      console.log("Loading Block Run's");
    }

    if (isError) {
      console.log("Error Block Run's");
      mutateCreateCart();

      navigate("/");
    }

    if (isSuccess) {
      data.products.forEach((product) =>
        addProduct(
          product.productId,
          product.price,
          product.quantity,
          product.name,
          product.imageUrl
        )
      );

      mutateUpdateCart({ _id: data._id, products, grandTotal });
      navigate("/");
    }
  }, [isLoading, isError, isSuccess]);

  return useMutation({
    mutationKey: [QUERY_KEYS.LOGIN],
    mutationFn: async (data: { email: string; password: string }) => {
      const res = await axiosApiWithAuth.post<LoginResponse>(
        "/users/login",
        data
      );
      return res.data;
    },
    onSuccess: async (data) => {
      toast({
        title: "Success",
        description: "You have been logged in",
      });

      login(data.user, data.accessToken);

      await refetch();
    },
    onError: (err: Error) => {
      const error = err as AxiosError<{ status: number; message: string }>;
      toast({
        title: "Error",
        description: error?.response?.data?.message,
      });
    },
  });
};
export const useLogout = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { clearCart } = useCartStore();

  return useMutation({
    mutationKey: [QUERY_KEYS.LOGOUT],
    mutationFn: async () => {
      await axiosApiWithAuth.get("/users/logout");
    },
    onSuccess: () => {
      logout();
      clearCart();
      navigate("/");
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ME],
    queryFn: async (): Promise<User> => {
      const res = await axiosApiWithAuth.get<{ user: User }>("/users/me");
      return res.data.user;
    },
  });
};

// Cart

export const useGetCart = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.GET_CART],
    queryFn: async () => {
      const res = await axiosApiWithAuth.get<{ cart: Cart }>("/users/cart");
      return res.data.cart;
    },
    enabled: false,
    retry: false,
  });
};

export const useCreateCart = () => {
  const { products, grandTotal, getFromRest } = useCartStore();
  return useMutation({
    mutationKey: [QUERY_KEYS.CREATE_CART],
    mutationFn: async () => {
      const res = await axiosApiWithAuth.post<{ cart: Cart }>("/users/cart", {
        products,
        grandTotal,
      });

      return res.data.cart;
    },
    onSuccess: (data) => {
      getFromRest(data);
    },
  });
};

export const useUpdateCart = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_CART],
    mutationFn: async (data: {
      _id: string;
      products: CartItem[];
      grandTotal: number;
    }) => {
      const res = await axiosApiWithAuth.put<{ cart: Cart }>(
        "/users/cart" + data._id,
        data
      );

      return res.data.cart;
    },
  });
};

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
