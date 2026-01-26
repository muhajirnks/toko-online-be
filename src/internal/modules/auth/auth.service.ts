import {
   createToken,
   createUser,
   deleteToken,
   findByEmail,
   findToken,
} from "./auth.repo";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NewBadRequestError, NewConflictError } from "@/pkg/apperror/appError";
import { RegisterRequest } from "./auth.validation";
import { generateRefreshToken, generateUserToken } from "@/pkg/auth/token";
import { findStoreByUserId } from "../store/store.repo";
import { findUserById } from "../user/user.repo";

export const registerService = async (data: RegisterRequest) => {
   const existUser = await findByEmail(data.email!);

   if (existUser) {
      throw NewConflictError("Email already exist");
   }

   const user = await createUser(data);

   return user;
};

export const loginService = async (email: string, password: string) => {
   const user = await findByEmail(email);

   if (!user) {
      throw NewBadRequestError("Bad Credential");
   }

   // Check Password
   const checkPassword = await bcrypt.compare(password, user.password!);

   if (!checkPassword) {
      throw NewBadRequestError("Bad Credential");
   }

   // Store Refresh Token
   const refToken = await createToken(
      user._id.toString(),
      generateRefreshToken(),
   );

   // Generate JWT Token
   const token = generateUserToken(refToken);

   const store = await findStoreByUserId(user._id.toString());

   delete user.password;

   return {
      token,
      data: {
         ...user,
         store: store || null,
      },
   };
};

export const refreshService = async (token: string) => {
   const storedToken = await findToken(token);

   if (!storedToken) {
      throw NewBadRequestError("Invalid refresh token");
   }

   const user = await findUserById(storedToken.userId.toString());

   if (!user) {
      throw NewBadRequestError("User not found");
   }

   const refToken = await createToken(
      user._id.toString(),
      generateRefreshToken(),
   );

   // Generate JWT Token
   const userToken = generateUserToken(refToken);
   await deleteToken(token);

   return {
      token: userToken,
   };
};

export const logoutService = async (token: string) => {
   return deleteToken(token);
};
