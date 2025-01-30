import axios from "axios";

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")!)
  : null;

const axiosInstance = axios.create({
  baseURL: import.meta.env.BACKEND_BASE_URL || "http://localhost:5000",
  headers: {
    Authorization: `Bearer ${user?.token}`,
  },
});

export const updateAxiosInstance = (token: string | null) => {
  axiosInstance.defaults.headers.Authorization = token ? `Bearer ${token}` : "";
};

export default axiosInstance;
