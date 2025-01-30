import { Request, Response } from "express";
import { KycModel } from "../../../models";

export const GetAllKycsController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const kycs = await KycModel.find()
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .populate("userId", "name email role");

    const total = await KycModel.countDocuments();

    res
      .status(200)
      .json({ total, page: Number(page), limit: Number(limit), kycs });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch KYC requests" });
  }
};
