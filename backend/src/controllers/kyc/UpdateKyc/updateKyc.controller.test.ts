import request from "supertest";
import { KycModel } from "../../../models";
import app from "../../../app";
import { initialize } from "../../../utils";
import { getUserDetails, validateJWT } from "../../../middlewares/functions";

jest.mock("../../../models");
jest.mock("../../../utils");
jest.mock("../../../middlewares/functions");

describe("UpdateKycController", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (initialize as jest.Mock<any>).mockImplementation(() => {});
    (getUserDetails as jest.Mock).mockResolvedValue({ _id: "", role: "Admin" });
    (validateJWT as jest.Mock<any>).mockReturnValue({ email: "" });
  });

  it("should return 400 if KYC has already been processed", async () => {
    (KycModel.findById as jest.Mock).mockResolvedValue({
      status: "Approved",
    });

    const response = await request(app)
      .patch("/api/admin/kyc-status/1")
      .set("Authorization", "Bearer Token")
      .send({ status: "Pending" });

    expect(response.status).toBe(400);
  });

  it("should return 200 if KYC is successfully updated", async () => {
    const mockKyc = { status: "Pending" };

    (KycModel.findById as jest.Mock).mockResolvedValue(mockKyc);
    (KycModel.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockKyc);

    const response = await request(app)
      .patch("/api/admin/kyc-status/1")
      .set("Authorization", "Bearer Token")
      .send({ status: "Approved" });

    expect(response.status).toBe(200);
  });

  it("should return 400 if there is a server error", async () => {
    (KycModel.findById as jest.Mock).mockRejectedValue(
      new Error("Server Error")
    );

    const response = await request(app)
      .patch("/api/admin/kyc-status/1")
      .send({ status: "Approved" })
      .set("Authorization", "Bearer Token");

    expect(response.status).toBe(400);
  });
});
