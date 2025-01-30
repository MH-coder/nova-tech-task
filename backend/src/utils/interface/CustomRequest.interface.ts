import { Request } from "express";
import { IUser } from "../../models";
import mongoose from "mongoose";

interface IRequestUser extends Omit<IUser, "password"> {
  _id: mongoose.Types.ObjectId | unknown;
}

export interface CustomRequest extends Request {
  user: Partial<IRequestUser>;
}
