import request from "supertest";
import { KycModel, UserModel } from "../../../models";
import app from "../../../app";
import { initialize } from "../../../utils";
import { getUserDetails, validateJWT } from "../../../middlewares/functions";

jest.mock("../../../models");
jest.mock("../../../utils");
jest.mock("../../../middlewares/functions");

describe("GetAllUsersController", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (initialize as jest.Mock<any>).mockImplementation(() => {});

    (validateJWT as jest.Mock<any>).mockReturnValue({ email: "" });
    (getUserDetails as jest.Mock).mockResolvedValue({ role: "" });
  });

  it("should return 200 and a list of users with their kyc status", async () => {
    const mockUser = {
      _id: "679aaaf90e1734d73ff08f6d",
      name: "Test",
      email: "test@gmail.com",
      role: "User",
      createdAt: "2025-01-29T22:26:01.061Z",
      updatedAt: "2025-01-29T22:26:01.061Z",
      __v: 0,
      kyc: {
        _id: "679abd5dbd476156a95f756a",
        userId: "679aaaf90e1734d73ff08f6d",
        status: "Approved",
        createdAt: "2025-01-29T23:44:29.695Z",
      },
    };

    (UserModel.find as jest.Mock).mockReturnValue({
      populate: jest.fn().mockReturnThis(), // Ensures chainability
      lean: jest.fn().mockResolvedValue([mockUser]), // Simulates a resolved promise with mock data
    });

    const response = await request(app)
      .get("/api/user")
      .set("Authorization", "Bearer Token");

    expect(response.status).toBe(200);
    expect(response.body).toEqual([mockUser]);
  });

  // it("should return 500 if there is a server error", async () => {
  //   (KycModel.find as jest.Mock).mockReturnValue({
  //     skip: jest.fn().mockReturnThis(),
  //     limit: jest.fn().mockReturnThis(),
  //     populate: jest.fn().mockRejectedValue(new Error("Server error")),
  //   });

  //   const response = await request(app)
  //     .get("/api/admin/kycs")
  //     .set("Authorization", "Bearer Token")
  //     .query({ page: 1, limit: 10 });

  //   expect(response.status).toBe(500);
  //   expect(response.body).toEqual({ error: "Failed to fetch KYC requests" });
  // });
});
