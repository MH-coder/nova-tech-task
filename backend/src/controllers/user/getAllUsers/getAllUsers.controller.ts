import { Request, Response } from "express";
import { UserModel } from "../../../models";

export const GetAllUsersController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const usersWithKycStatus = await UserModel.find({}, { password: 0 })
      .populate({
        path: "kyc",
        select: "status createdAt", // Select only necessary fields
        options: { sort: { createdAt: -1 } }, // Sort by createdAt (latest first)
      })
      .lean();

    res.status(200).json(usersWithKycStatus);
  } catch (error) {
    res.status(400).json({ error: "Failed to fetch KYC requests" });
  }
};
