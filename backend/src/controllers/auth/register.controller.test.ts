import request from "supertest";
import { UserModel } from "../../models";
import app from "../../app";

jest.mock("../../models");

describe("RegisterController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if email is already in use", async () => {
    (UserModel.findOne as jest.Mock<any>).mockResolvedValue({
      email: "test@example.com",
    });

    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

    expect(response.status).toBe(400);
  });

  it("should return 201 if user is registered successfully", async () => {
    (UserModel.findOne as jest.Mock<any>).mockResolvedValue(null);
    (UserModel.prototype.save as jest.Mock).mockResolvedValue({});

    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

    expect(response.status).toBe(201);
  });

  it("should return 500 if there is a server error", async () => {
    (UserModel.findOne as jest.Mock<any>).mockRejectedValue(
      new Error("Server error")
    );

    const response = await request(app)
      .post("/api/auth/register")
      .send({
        name: "Test User",
        email: "test@example.com",
        password: "password123",
      });

    expect(response.status).toBe(500);
  });
});
