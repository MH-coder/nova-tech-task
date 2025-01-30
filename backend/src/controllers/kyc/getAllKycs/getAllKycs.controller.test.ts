import request from "supertest";
import { KycModel, UserModel } from "../../../models";
import app from "../../../app";
import { initialize } from "../../../utils";
import { getUserDetails, validateJWT } from "../../../middlewares/functions";

jest.mock("../../../models");
jest.mock("../../../utils");
jest.mock("../../../middlewares/functions");

describe("GetAllKycsController", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (initialize as jest.Mock<any>).mockImplementation(() => {});

    (validateJWT as jest.Mock<any>).mockReturnValue({ email: "" });
    (getUserDetails as jest.Mock).mockResolvedValue({ role: "Admin" });
  });

  it("should return 200 and a list of KYC requests", async () => {
    (KycModel.find as jest.Mock).mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      populate: jest.fn().mockResolvedValue([
        {
          userId: { name: "User1", email: "user1@example.com", role: "User" },
        },
        {
          userId: { name: "User2", email: "user2@example.com", role: "User" },
        },
      ]),
    });
    (KycModel.countDocuments as jest.Mock).mockResolvedValue(2);

    const response = await request(app)
      .get("/api/admin/kycs")
      .set("Authorization", "Bearer Token")
      .query({ page: 1, limit: 10 });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      total: 2,
      page: 1,
      limit: 10,
      kycs: expect.any(Array),
    });
  });

  it("should return 500 if there is a server error", async () => {
    (KycModel.find as jest.Mock).mockReturnValue({
      skip: jest.fn().mockReturnThis(),
      limit: jest.fn().mockReturnThis(),
      populate: jest.fn().mockRejectedValue(new Error("Server error")),
    });

    const response = await request(app)
      .get("/api/admin/kycs")
      .set("Authorization", "Bearer Token")
      .query({ page: 1, limit: 10 });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: "Failed to fetch KYC requests" });
  });
});
