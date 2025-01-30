import { UserModel } from "../../models";

export const getUserDetails = async (email: string) => {
  return await UserModel.findOne(
    {
      email,
    },
    { password: 0 }
  );
};
