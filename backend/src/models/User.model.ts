import mongoose, { Schema, Document } from "mongoose";
import { UserRole } from "../utils";

export interface IUser {
  name: string;
  email: string;
  password: string;
  role: UserRole.ADMIN | UserRole.USER;
}

export interface IUserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [UserRole.ADMIN, UserRole.USER],
      default: UserRole.USER,
    },
  },
  { timestamps: true }
);

UserSchema.virtual("kyc", {
  ref: "Kyc", // Reference the KycModel
  localField: "_id", // Match _id from UserModel
  foreignField: "userId", // Match userId from KycModel
  justOne: true, // Get only one document
  options: { sort: { createdAt: -1 } }, // Get the latest KYC document
});

export const UserModel = mongoose.model<IUserModel>("User", UserSchema);
