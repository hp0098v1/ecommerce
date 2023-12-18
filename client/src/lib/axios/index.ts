import axios from "axios";

export const axiosApi = axios.create({
  baseURL: import.meta.env.VITE_APP_API_URL,
  headers: {
    "Content-Type": "Application/json",
  },
});
