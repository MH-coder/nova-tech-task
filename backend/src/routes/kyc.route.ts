import { Router } from "express";
import {
  CreateKycController,
  createKycValidator,
  GetUserKycController,
} from "../controllers";
import {
  authenticate,
  uploadMiddleware,
  validateRequest,
} from "../middlewares";

export const kycRouter = Router();

kycRouter.use(authenticate);

kycRouter.get("/user", GetUserKycController);
kycRouter.post(
  "/",
  [
    uploadMiddleware("idDocument"),
    validateRequest(createKycValidator, ["body"]),
  ],
  CreateKycController
);
