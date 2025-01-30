import request from "supertest";
import { KycModel } from "../../../models";
import app from "../../../app";
import { initialize } from "../../../utils";
import { getUserDetails, validateJWT } from "../../../middlewares/functions";

jest.mock("../../../models");
jest.mock("../../../utils");
jest.mock("../../../middlewares/functions");

describe("GetUserKycController", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (initialize as jest.Mock<any>).mockImplementation(() => {});
    (getUserDetails as jest.Mock).mockResolvedValue({ _id: "" });
    (validateJWT as jest.Mock<any>).mockReturnValue({ email: "" });
  });

  it("should return 404 if KYC record is not found", async () => {
    (KycModel.findOne as jest.Mock).mockReturnValue({
      sort: jest.fn().mockResolvedValue(null),
    });

    const response = await request(app)
      .get("/api/kyc/user")
      .set("Authorization", "Bearer Token");

    expect(response.status).toBe(404);
  });

  it("should return 200 if KYC record is found", async () => {
    const mockUser = {
      name: "Temp User",
      status: "Approved",
      userId: "fake_id",
    };

    (KycModel.findOne as jest.Mock).mockReturnValue({
      sort: jest.fn().mockResolvedValue(mockUser),
    });

    const response = await request(app)
      .get("/api/kyc/user")
      .set("Authorization", "Bearer Token");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUser);
  });

  it("should return 400 if there is a server error", async () => {
    (KycModel.findOne as jest.Mock).mockReturnValue({
      sort: jest.fn().mockRejectedValue(new Error("Server Error")),
    });

    const response = await request(app)
      .get("/api/kyc/user")
      .set("Authorization", "Bearer Token");

    expect(response.status).toBe(400);
  });
});
