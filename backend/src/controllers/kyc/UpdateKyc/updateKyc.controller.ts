import { Request, Response } from "express";
import { KycModel } from "../../../models";
import { KycStatus } from "../../../utils";

export const UpdateKycController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const payload = req.body;

    // Check if KYC has already been processed
    const kyc = await KycModel.findById(req.params.id);

    if (
      kyc &&
      (kyc.status === KycStatus.APPROVED || kyc.status === KycStatus.REJECTED)
    ) {
      return res.status(400).json({ error: "KYC has already been processed" });
    }

    // Update KYC
    const updatedKyc = await KycModel.findByIdAndUpdate(req.params.id, payload);

    res.status(200).json({ message: "KYC updated", data: updatedKyc });
  } catch (error) {
    res.status(400).json({ error: "Failed to update KYC" });
  }
};
