import Token from "@/internal/models/token";
import User from "@/internal/models/user";

export const findByEmail = async (email: string) => {
   return await User.findOne({ email }).exec();
};

export const createUser = async (data: any) => {
   return await User.create(data);
};

export const findToken = async (token: string) => {
   return await Token.findOne({ refreshToken: token }).exec();
};

export const deleteToken = async (token: string) => {
   return await Token.deleteOne({ refreshToken: token }).exec();
};

export const createToken = async (userId: string, refreshToken: string) => {
   return await Token.create({
      userId,
      refreshToken,
      lastUsed: new Date(),
   });
};
