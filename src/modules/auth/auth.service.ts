import { findByEmail } from "./auth.repo";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "@/models/User";

export const loginService = async (email: string, password: string) => {
   const user = await findByEmail(email);

   if (!user) {
      throw new Error("Bad Credential");
   }

   // Check Password
   const checkPassword = await bcrypt.compare(password, user.password!);

   if (!checkPassword) {
      throw new Error("Bad Credential");
   }

   // Generate JWT Token
   const token = jwt.sign({ email: user.email }, process.env.JWT_KEY!, {
      expiresIn: "1d",
   });

   user.password = undefined;

   return { token, data: user };
};

export const verifyToken = async (token: string) => {
   try {
      const decoded = jwt.verify(token, process.env.JWT_KEY!);
      const user = await User.findOne({
         email: (decoded as JwtPayload).email,
      }).select("-password");
      return user;
   } catch {
      throw new Error("Unauthorized");
   }
};
