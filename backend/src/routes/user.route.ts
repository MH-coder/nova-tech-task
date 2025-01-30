import { Router } from "express";
import { authenticate } from "../middlewares";
import { GetAllUsersController } from "../controllers/user/getAllUsers";

export const userRouter = Router();

userRouter.use(authenticate);

userRouter.get("/", GetAllUsersController);
