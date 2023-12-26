import axios from "axios";
import { useAuthStore } from "../zustand/authStore";

export const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "Application/json",
  },
});

export const axiosApiWithAuth = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "Application/json",
  },
  withCredentials: true,
});

axiosApiWithAuth.interceptors.request.use(
  async (config) => {
    const accessToken = useAuthStore.getState().accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosApiWithAuth.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const response = await axiosApiWithAuth.get<{ accessToken: string }>(
        "/users/refresh"
      );

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.accessToken}`;
      useAuthStore.setState({ accessToken: response.data.accessToken });

      return axiosApiWithAuth(originalRequest);
    }

    return Promise.reject(error);
  }
);
