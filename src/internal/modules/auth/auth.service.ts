import { createToken, createUser, deleteToken, findByEmail, findToken } from "./auth.repo";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { NewBadRequestError, NewConflictError } from "@/pkg/apperror/appError";

export const registerService = async (data: any) => {
   const existUser = await findByEmail(data.email);

   if (existUser) {
      throw NewConflictError("Email already exist");
   }

   const user = await createUser(data);

   const userObj = user.toObject();
   delete userObj.password;

   return userObj;
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

   // Generate JWT Token
   const accessToken = jwt.sign({ email: user.email }, process.env.JWT_KEY!, {
      expiresIn: "1h",
   });

   const refreshToken = jwt.sign({ email: user.email }, process.env.JWT_REFRESH_KEY!, {
      expiresIn: "7d",
   });

   // Store Refresh Token
   await createToken(user.id, refreshToken);

   const userObj = user.toObject();
   delete userObj.password;

   return {
      token: {
         type: "Bearer",
         accessToken,
         refreshToken,
      },
      data: userObj,
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
      await createToken(user.id, refreshToken);

      const userObj = user.toObject();
      delete userObj.password;

      return {
         token: {
            type: "Bearer",
            accessToken,
            refreshToken,
         },
         data: userObj,
      };
   } catch (error) {
      throw NewBadRequestError("Invalid or expired refresh token");
   }
};

export const logoutService = async (token: string) => {
   return deleteToken(token);
};