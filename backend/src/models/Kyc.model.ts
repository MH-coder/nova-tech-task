import mongoose, { Schema, Document } from "mongoose";
import { KycStatus } from "../utils";

export interface IKycModel extends Document {
  userId: mongoose.Types.ObjectId;
  name: string;
  idDocument: object;
  status: KycStatus.APPROVED | KycStatus.PENDING | KycStatus.REJECTED;
}

const KycSchema: Schema = new Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    idDocument: {
      type: {
        filename: String,
        contentType: String,
        fileUrl: String,
      },
      required: true,
    },
    status: {
      type: String,
      enum: [KycStatus.APPROVED, KycStatus.PENDING, KycStatus.REJECTED],
      default: KycStatus.PENDING,
    },
  },
  { timestamps: true }
);

export const KycModel = mongoose.model<IKycModel>("Kyc", KycSchema);
