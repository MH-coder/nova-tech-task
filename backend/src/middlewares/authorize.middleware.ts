import { Response, NextFunction } from "express";
import { CustomRequest } from "../utils/interface";

export const authorize =
  (role: string) =>
  async (
    req: CustomRequest,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    if (req.user?.role !== role) {
      return res.status(403).json({ error: "Access denied" });
    }
    next();
  };
