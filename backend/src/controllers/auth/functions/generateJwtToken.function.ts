import "dotenv/config";
import * as jwt from "jsonwebtoken";
import { IUser } from "../../../models";

export const generateJwtToken = (user: IUser) => {
  return jwt.sign(
    { email: user.email, role: user.role },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "1d",
    }
  );
};
