import "dotenv/config";
import * as jwt from "jsonwebtoken";
import { JwtPayload } from "../../utils";

export const validateJWT = (token: string) => {
  return jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;
};
