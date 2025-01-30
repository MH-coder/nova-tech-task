import axios from "./axiosInstance";

export const signupUser = async (user: {
  name: string;
  email: string;
  password: string;
}) => {
  const response = await axios.post("/api/auth/register", user);
  if (response.status !== 201) {
    throw new Error("Signup failed");
  }
  return response.data;
};

export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axios.post("/api/auth/login", credentials);
  if (response.status !== 200) {
    throw new Error("Login failed");
  }
  return response.data;
};
