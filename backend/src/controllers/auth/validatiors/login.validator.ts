import { object, string } from "yup";

export const loginValidator = object().shape({
  email: string()
    .email("Invalid email")
    .transform((value) => value.toLowerCase())
    .required("Email is required"),
  password: string()
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});
