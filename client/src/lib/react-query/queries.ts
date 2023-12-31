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
  const { login } = useAuthStore();
  const { products, grandTotal, setCart } = useCartStore();

  // React Query
  const { refetch } = useGetCart(false);
  const { mutateAsync: createCartMutateAsync } = useCreateCart();
  const { mutateAsync: updateCartMutateAsync } = useUpdateCart();

  const checkCart = async (
    data: TGetCartResponse | undefined,
    isSuccess: boolean,
    isError: boolean,
    error: TAxiosErrorResponse | null
  ) => {
    if (isError && error !== null) {
      if (error.response?.status === 404) {
        await createCartMutateAsync({ grandTotal, products });
        return navigate("/");
      }
    }

    if (data !== undefined && isSuccess) {
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

  return useMutation({
    mutationKey: [QUERY_KEYS.LOGIN],
    mutationFn: loginFn,
    onSuccess: async (data) => {
      toast({
        title: "Success",
        description: "Login Successful",
      });

      login(data.user, data.accessToken);
      const { data: resData, isSuccess, isError, error } = await refetch();
      checkCart(resData, isSuccess, isError, error);
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
    retry: 2,
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
  const { cartId, updateCart: updateCartInStore } = useCartStore();

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
    onMutate: async (variables) => {
      await clientQuery.cancelQueries({
        queryKey: [QUERY_KEYS.GET_CART, cartId],
      });

      const previousCart = clientQuery.getQueryData([
        QUERY_KEYS.GET_CART,
        cartId,
      ]);

      clientQuery.setQueryData([QUERY_KEYS.GET_CART, cartId], variables.data);
      updateCartInStore(variables.data.products, variables.data.grandTotal);
      return { previousCart, newCart: variables.data };
    },
    onSuccess: async () => {
      await clientQuery.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_CART, user?._id || ""],
      });
    },
    onError: (err, _, context) => {
      const error = err as TAxiosErrorResponse;

      clientQuery.setQueryData(
        [QUERY_KEYS.GET_CART, cartId],
        context?.previousCart
      );

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
