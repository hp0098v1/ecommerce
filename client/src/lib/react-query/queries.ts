import { useNavigate } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import QUERY_KEYS from "./queryKeys";
import {
  createCart,
  getCart,
  getCategories,
  getMe,
  getProductById,
  getProducts,
  login as loginFn,
  logout as logoutFn,
  register,
  updateCart,
} from "./queryFns";

import { useAuthStore, useCartStore } from "../zustand";
import { TAxiosErrorResponse, TGetCartResponse } from "@/types/responseTypes";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { TCartItem } from "@/types";
import { axiosApiWithAuth } from "../axios";
import { mergeProducts } from "../utils";

/* -------------------------------------------------------------------------- */
/*                                Auth Queries                                */
/* -------------------------------------------------------------------------- */
export const useRegister = () => {
  // React Router Dom
  const navigate = useNavigate();

  // UI
  const { toast } = useToast();

  // Zustand
  const { login } = useAuthStore();
  const { products, grandTotal } = useCartStore();

  // React Query
  const { mutateAsync: createCartMutateAsync } = useCreateCart();

  return useMutation({
    mutationKey: [QUERY_KEYS.REGISTER],
    mutationFn: register,
    onSuccess: async (data) => {
      toast({
        title: "Success",
        description: "Register Successful",
      });

      login(data.user, data.accessToken);
      await createCartMutateAsync({ products, grandTotal });
      navigate("/");
    },
    onError: (err) => {
      const error = err as TAxiosErrorResponse;

      toast({
        title: `Error (${error?.response?.data.status})`,
        description: error?.response?.data?.message,
      });
    },
  });
};

export const useLogin = () => {
  // React Router Dom
  const navigate = useNavigate();

  // UI
  const { toast } = useToast();

  // Zustand
  const { login, isLoggedIn } = useAuthStore();
  const { products, grandTotal, setCart } = useCartStore();

  // React Query
  const { data, isSuccess, isError, error } = useGetCart(isLoggedIn);
  const { mutateAsync: createCartMutateAsync } = useCreateCart();
  const { mutateAsync: updateCartMutateAsync } = useUpdateCart();

  useEffect(() => {
    const checkCart = async () => {
      if (isError) {
        if (error.response?.status === 404) {
          await createCartMutateAsync({ grandTotal, products });
          return navigate("/");
        }
      }

      if (isSuccess) {
        // Zustand Cart is empty
        // getCart response is empty or not empty (does not matter)
        if (products.length !== 0) {
          // Zustand Cart is not empty
          // getCart response is empty
          if (data.cart.products.length === 0) {
            const res = await updateCartMutateAsync({
              data: { products, grandTotal },
              cartId: data.cart._id,
            });

            setCart(
              res.cart._id,
              res.cart.userId,
              res.cart.products,
              res.cart.grandTotal
            );

            return navigate("/");
          }
          // Zustand Cart is not empty
          // getCart response is not empty
          else {
            const mergedCart = mergeProducts(data.cart.products, products);

            const grandTotal = mergedCart.reduce(
              (acc, cur) => acc + cur.subtotal,
              0
            );

            const res = await updateCartMutateAsync({
              data: { products: mergedCart, grandTotal },
              cartId: data.cart._id,
            });

            setCart(
              res.cart._id,
              res.cart.userId,
              res.cart.products,
              res.cart.grandTotal
            );
            return navigate("/");
          }
        } else {
          setCart(
            data.cart._id,
            data.cart.userId,
            data.cart.products,
            data.cart.grandTotal
          );
          return navigate("/");
        }
      }
    };

    if (isLoggedIn) checkCart();
  }, [isSuccess, isError, error, isLoggedIn]);

  return useMutation({
    mutationKey: [QUERY_KEYS.LOGIN],
    mutationFn: loginFn,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Login Successful",
      });

      login(data.user, data.accessToken);
    },
    onError: (err) => {
      const error = err as TAxiosErrorResponse;

      toast({
        title: `Error (${error?.response?.data.status})`,
        description: error?.response?.data?.message,
      });
    },
  });
};
export const useLogout = () => {
  // React Router Dom
  const navigate = useNavigate();

  // UI
  const { toast } = useToast();

  // Zustand
  const { logout } = useAuthStore();
  const { clearCart } = useCartStore();

  // React Query
  const clientQuery = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.LOGOUT],
    mutationFn: logoutFn,
    onSuccess: async () => {
      toast({
        title: "Success",
        description: "Logout Successful",
      });

      delete axiosApiWithAuth.defaults.headers.common["Authorization"];
      clientQuery.removeQueries({
        queryKey: [QUERY_KEYS.ME, QUERY_KEYS.GET_CART],
      });
      clearCart();
      logout();
      navigate("/");
    },
    onError: (err) => {
      const error = err as TAxiosErrorResponse;

      toast({
        title: `Error ${error.response?.data.status}`,
        description: error.response?.data.message,
      });
    },
  });
};

/* -------------------------------------------------------------------------- */
/*                                User Queries                                */
/* -------------------------------------------------------------------------- */
export const useGetMe = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.ME],
    queryFn: getMe,
    retry: 2,
  });
};

/* -------------------------------------------------------------------------- */
/*                                Cart Queries                                */
/* -------------------------------------------------------------------------- */
export const useGetCart = (enbaled: boolean) => {
  const { user } = useAuthStore();

  return useQuery<TGetCartResponse, TAxiosErrorResponse>({
    queryKey: [QUERY_KEYS.GET_CART, user?._id || ""],
    queryFn: getCart,
    retry: false,
    enabled: enbaled,
  });
};

export const useCreateCart = () => {
  // UI
  const { toast } = useToast();

  // Zustand
  const { setCart } = useCartStore();

  return useMutation({
    mutationKey: [QUERY_KEYS.CREATE_CART],
    mutationFn: createCart,
    onSuccess: (data) => {
      setCart(
        data.cart._id,
        data.cart.userId,
        data.cart.products,
        data.cart.grandTotal
      );
    },
    onError: (err) => {
      const error = err as TAxiosErrorResponse;

      toast({
        title: `Error (${error?.response?.data.status})`,
        description: error?.response?.data?.message,
      });
    },
  });
};

export const useUpdateCart = () => {
  // UI
  const { toast } = useToast();

  // Zusrand
  const { user } = useAuthStore();

  const clientQuery = useQueryClient();

  return useMutation({
    mutationKey: [QUERY_KEYS.UPDATE_CART],
    mutationFn: ({
      data,
      cartId,
    }: {
      data: {
        products: TCartItem[];
        grandTotal: number;
      };
      cartId: string;
    }) => updateCart(data, cartId),
    onSuccess: async () => {
      await clientQuery.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CART, user?._id || ""],
      });
    },
    onError: (err) => {
      const error = err as TAxiosErrorResponse;

      toast({
        title: `Error (${error?.response?.data.status})`,
        description: error?.response?.data?.message,
      });
    },
  });
};

export const useGetCategories = () =>
  useQuery({
    queryKey: [QUERY_KEYS.CATEGORIES],
    queryFn: getCategories,
  });

export const useGetProducts = (page = 1, limit = 9, populate = "category") =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, page, limit],
    queryFn: () => getProducts(page, limit, populate),
  });

export const useGetProductById = (productId: string, populate = "") =>
  useQuery({
    queryKey: [QUERY_KEYS.PRODUCTS, productId],
    queryFn: () => getProductById(productId, populate),
  });
