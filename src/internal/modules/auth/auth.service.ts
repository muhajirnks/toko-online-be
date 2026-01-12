import { createToken, createUser, deleteToken, findByEmail, findToken } from "./auth.repo";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NewBadRequestError, NewConflictError } from "@/pkg/apperror/appError";
import { RegisterRequest } from "./auth.validation";
import { generateRefreshToken, generateUserToken } from "@/pkg/auth/token";

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
   const refToken = await createToken(user._id.toString(), generateRefreshToken());

   // Generate JWT Token
   const token = generateUserToken(refToken)

   delete user.password;

   return {
      token,
      data: user,
   };
};

export const refreshService = async (token: string) => {
   const storedToken = await findToken(token);

   if (!storedToken) {
      throw NewBadRequestError("Invalid refresh token");
   }

   try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_KEY!) as { email: string };
      const user = await findByEmail(decoded.email);

      if (!user) {
         throw NewBadRequestError("User not found");
      }

      const accessToken = jwt.sign({ email: user.email }, process.env.JWT_KEY!, {
         expiresIn: "1h",
      });

      const refreshToken = jwt.sign({ email: user.email }, process.env.JWT_REFRESH_KEY!, {
         expiresIn: "7d",
      });

      // Update Refresh Token (Optional: rotate token)
      await deleteToken(token);
      await createToken(user._id.toString(), refreshToken);

      delete user.password;

      return {
         token: {
            type: "Bearer",
            accessToken,
            refreshToken,
         },
         data: user,
      };
   } catch (error) {
      throw NewBadRequestError("Invalid or expired refresh token");
   }
};

export const logoutService = async (token: string) => {
   return deleteToken(token);
};