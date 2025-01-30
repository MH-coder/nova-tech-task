import { Response } from "express";
import { KycModel } from "../../../models";
import { CustomRequest } from "../../../utils/interface";

export const GetUserKycController = async (
  req: CustomRequest,
  res: Response
): Promise<any> => {
  try {
    const kyc = await KycModel.findOne({ userId: req.user._id }).sort({
      createdAt: -1,
    });

    if (!kyc) return res.status(404).json({ message: "No KYC record found" });

    return res.status(200).json(kyc);
  } catch (error) {
    return res.status(400).json({ error: "Failed to fetch KYC status" });
  }
};
