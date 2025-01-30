import { Request, Response } from "express";
import { KycModel, UserModel } from "../../../models";
import { KycStatus } from "../../../utils";

export const GetKpisController = async (req: Request, res: Response) => {
  try {
    const [totalUsers, kycStats] = await Promise.all([
      UserModel.countDocuments(), // Total users
      KycModel.aggregate([
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$count" },
            approved: {
              $sum: {
                $cond: [{ $eq: ["$_id", KycStatus.APPROVED] }, "$count", 0],
              },
            },
            rejected: {
              $sum: {
                $cond: [{ $eq: ["$_id", KycStatus.REJECTED] }, "$count", 0],
              },
            },
            pending: {
              $sum: {
                $cond: [{ $eq: ["$_id", KycStatus.PENDING] }, "$count", 0],
              },
            },
          },
        },
        {
          $project: {
            _id: 0,
            total: 1,
            approved: 1,
            rejected: 1,
            pending: 1,
          },
        },
      ]),
    ]);

    // Extract results
    const {
      total: totalKyc = 0,
      approved: approvedKyc = 0,
      rejected: rejectedKyc = 0,
      pending: pendingKyc = 0,
    } = kycStats[0] || {}; // Handles empty or missing kycStats

    res
      .status(200)
      .json({ totalUsers, totalKyc, approvedKyc, rejectedKyc, pendingKyc });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ error: "Failed to fetch KPIs" });
  }
};
