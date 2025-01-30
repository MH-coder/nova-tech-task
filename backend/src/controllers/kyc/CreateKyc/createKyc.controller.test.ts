import request from "supertest";
import { KycModel, UserModel } from "../../../models";
import app from "../../../app";
import { cloudinary, initialize } from "../../../utils";
import {
  getUserDetails,
  // authenticate,
  // uploadMiddleware,
  validateJWT,
} from "../../../middlewares/functions";

jest.mock("../../../models");
jest.mock("../../../utils");
jest.mock("../../../middlewares/functions");

describe("CreateKycController", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (initialize as jest.Mock<any>).mockImplementation(() => {});
    (getUserDetails as jest.Mock).mockResolvedValue({ role: "Admin" });
    (validateJWT as jest.Mock<any>).mockReturnValue({ email: "" });
  });

  it("should return 201 if KYC is submitted successfully", async () => {
    (cloudinary.uploader.upload as jest.Mock).mockResolvedValue({
      secure_url: "http://example.com/kyc_document.jpg",
    });
    (KycModel.create as jest.Mock).mockResolvedValue({});

    const response = await request(app)
      .post("/api/kyc")
      .set("Authorization", "Bearer Token")
      .field("name", "Test User")
      .attach(
        "idDocument",
        Buffer.from("dummy file content"),
        "kyc_document.jpg"
      );

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      message: "KYC submitted successfully",
      data: expect.any(Object),
    });
  });

  it("should return 400 if there is a server error", async () => {
    (cloudinary.uploader.upload as jest.Mock).mockRejectedValue(
      new Error("Server error")
    );

    const response = await request(app)
      .post("/api/kyc")
      .set("Authorization", "Bearer Token")
      .field("name", "Test User")
      .attach(
        "idDocument",
        Buffer.from("dummy file content"),
        "kyc_document.jpg"
      );

    expect(response.status).toBe(400);
  });
});
