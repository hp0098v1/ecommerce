import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";

import QUERY_KEYS from "./queryKeys";
import {
  getCategories,
  getMe,
  getProductById,
  getProducts,
  login as loginFn,
  logout as logoutFn,
  register,
} from "./queryFns";

import { useAuthStore } from "../zustand";
import { TAxiosErrorResponse } from "@/types/responseTypes";
import { useToast } from "@/components/ui/use-toast";

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

  return useMutation({
    mutationKey: [QUERY_KEYS.REGISTER],
    mutationFn: register,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Register Successful",
      });

      login(data.user, data.accessToken);
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

  return useMutation({
    mutationKey: [QUERY_KEYS.LOGIN],
    mutationFn: loginFn,
    onSuccess: (data) => {
      toast({
        title: "Success",
        description: "Login Successful",
      });

      login(data.user, data.accessToken);
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
export const useLogout = () => {
  // React Router Dom
  const navigate = useNavigate();

  // UI
  const { toast } = useToast();

  // Zustand
  const { logout } = useAuthStore();

  return useMutation({
    mutationKey: [QUERY_KEYS.LOGOUT],
    mutationFn: logoutFn,
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Logout Successful",
      });

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
    retry: false,
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
