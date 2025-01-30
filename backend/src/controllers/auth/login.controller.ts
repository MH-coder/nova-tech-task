import { Request, Response } from "express";
import { UserModel } from "../../models";
import { generateJwtToken, isPasswordValid } from "./functions";

export const LoginController = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) return res.status(404).json({ error: "User not found" });

    const _isPasswordValid = await isPasswordValid(password, user.password);

    if (!_isPasswordValid)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = generateJwtToken(user);

    return res
      .status(200)
      .json({ name: user.name, email: user.email, role: user.role, token });
  } catch (error) {
    return res.status(500).json({ error: "Failed to log in" });
  }
};
