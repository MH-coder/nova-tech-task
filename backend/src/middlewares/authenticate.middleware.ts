import { Response, NextFunction } from "express";
import { CustomRequest } from "../utils/interface";
import { getUserDetails, validateJWT } from "./functions";

export const authenticate = async (
  req: CustomRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract Bearer token
  if (!token) {
    return res.status(401).json({ error: "Authentication token missing" });
  }

  try {
    const decoded = validateJWT(token); // Validate JWT token

    const user = await getUserDetails(decoded.email);
    if (!user) return res.status(400).json({ error: "User not found" });

    req.user = user!; // Attach user details to the request object
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};
