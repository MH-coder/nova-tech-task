import bcrypt from "bcryptjs";

export const isPasswordValid = async (
  password: string,
  hashedPassword: string
) => {
  return await bcrypt.compare(password, hashedPassword);
};
