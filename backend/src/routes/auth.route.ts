import { Router } from "express";
import { LoginController, RegisterController } from "../controllers";
import { validateRequest } from "../middlewares";
import {
  loginValidator,
  registerValidator,
} from "../controllers/auth/validatiors";

export const authRouter = Router();

authRouter.post(
  "/register",
  validateRequest(registerValidator, ["body"]),
  RegisterController
);
authRouter.post(
  "/login",
  validateRequest(loginValidator, ["body"]),
  LoginController
);
