import request from "supertest";
import { UserModel } from "../../models";
import app from "../../app";
import { isPasswordValid, generateJwtToken } from "./functions";

jest.mock("../../models");
jest.mock("jsonwebtoken");
jest.mock("./functions");

describe("LoginController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return 404 if user is not found", async () => {
    (UserModel.findOne as jest.Mock<any>).mockResolvedValue(null);

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(response.status).toBe(404);
  });

  it("should return 401 if password is invalid", async () => {
    (UserModel.findOne as jest.Mock<any>).mockResolvedValue({
      email: "test@example.com",
      password: "hashedpassword",
    });
    (isPasswordValid as jest.Mock).mockImplementation(() => false);

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "wrongpassword" });

    expect(response.status).toBe(401);
  });

  it("should return 200 and a token if login is successful", async () => {
    const user = {
      email: "test@example.com",
      password: "hashedpassword",
      name: "Test User",
      role: "user",
    };
    (UserModel.findOne as jest.Mock).mockResolvedValue(user);
    (isPasswordValid as jest.Mock).mockResolvedValue(true);
    (generateJwtToken as jest.Mock).mockReturnValue("fake-jwt-token");

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: user.name,
      email: user.email,
      role: user.role,
      token: "fake-jwt-token",
    });
  });

  it("should return 500 if there is a server error", async () => {
    (UserModel.findOne as jest.Mock<any>).mockRejectedValue(
      new Error("Server error")
    );

    const response = await request(app)
      .post("/api/auth/login")
      .send({ email: "test@example.com", password: "password123" });

    expect(response.status).toBe(500);
  });
});
