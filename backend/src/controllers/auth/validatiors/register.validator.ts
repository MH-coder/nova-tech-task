import { object, string } from "yup";

export const registerValidator = object().shape({
  name: string().required("Name is required"),
  email: string()
    .email("Invalid email")
    .transform((value) => value.toLowerCase())
    .required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});
