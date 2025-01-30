import { UserRole } from "../enums";
import { JwtPayload as payload } from "jsonwebtoken";

export interface JwtPayload extends payload {
  email: string;
  role: UserRole.ADMIN | UserRole.USER;
}
