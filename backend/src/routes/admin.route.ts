import { Router } from "express";
import { GetKpisController } from "../controllers/dashboard/getKpis/getKpis.controller";
import { authenticate, authorize, validateRequest } from "../middlewares";
import { UserRole } from "../utils";
import { GetAllKycsController, UpdateKycController } from "../controllers";
import { updateKycValidator } from "../controllers/kyc/UpdateKyc/validators";

export const adminRouter = Router();

adminRouter.use(authenticate);

adminRouter.get("/kycs", authorize(UserRole.ADMIN), GetAllKycsController);
adminRouter.get("/kpis", authorize(UserRole.ADMIN), GetKpisController);
adminRouter.patch(
  "/kyc-status/:id",
  [
    authorize(UserRole.ADMIN),
    validateRequest(updateKycValidator, ["params", "body"]),
  ],
  UpdateKycController
);
