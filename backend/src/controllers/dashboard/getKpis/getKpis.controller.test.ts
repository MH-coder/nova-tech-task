import request from "supertest";
import { UserModel, KycModel } from "../../../models";
import { describe, expect, jest, it } from "@jest/globals";
import app from "../../../app";
import { initialize } from "../../../utils/functions";
import { getUserDetails, validateJWT } from "../../../middlewares/functions";

// Mocking the UserModel and KycModel
jest.mock("../../../models");
jest.mock("../../../utils/functions");
jest.mock("../../../middlewares/functions");

describe("GET /kpis", () => {
  beforeEach(() => {
    // Clear all instances and calls to constructor and all methods:
    jest.clearAllMocks();

    (initialize as jest.Mock<any>).mockImplementation(() => {});
    (getUserDetails as jest.Mock<any>).mockResolvedValue({ role: "Admin" });
    (validateJWT as jest.Mock<any>).mockReturnValue({ email: "" });
  });

  it("should return KPIs with correct data", async () => {
    // Mocking UserModel countDocuments response
    (UserModel.countDocuments as jest.Mock<any>).mockResolvedValue(1000); // 1000 total users

    // Mocking KycModel.aggregate response
    (KycModel.aggregate as jest.Mock<any>).mockResolvedValue([
      {
        total: 500, // total KYC records
        approved: 300, // approved KYC records
        rejected: 100, // rejected KYC records
        pending: 100, // pending KYC records
      },
    ]);

    // Making the request using supertest
    const response = await request(app)
      .get("/api/admin/kpis")
      .set("Authorization", "Bearer token");

    // Assert the response status and body
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      totalUsers: 1000,
      totalKyc: 500,
      approvedKyc: 300,
      rejectedKyc: 100,
      pendingKyc: 100,
    });
  });
});
