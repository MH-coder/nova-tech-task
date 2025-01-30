import axios from "./axiosInstance";

export const getUsers = async () => {
  const response = await axios.get("/api/user");
  if (response.status !== 200) {
    throw new Error("Failed to fetch users");
  }
  return response.data;
};
