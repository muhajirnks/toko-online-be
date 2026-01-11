import { Request, Response, NextFunction } from "express";
import User, { UserSchema } from "@/internal/models/user";
import jwt, { JwtPayload } from "jsonwebtoken";
import { HydratedDocument } from "mongoose";

declare global {
   namespace Express {
      interface Request {
         user: HydratedDocument<UserSchema> | null;
      }
   }
}

const authMiddleware = async (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const token = req.cookies.access_token;

   if (token) {
      try {
         const user = await verifyToken(token);
         req.user = user;
         next();
      } catch (err: any) {
         res.status(401).json({ message: err.message });
      }
   } else {
      res.status(401).json({ message: "Unauthorized" });
   }
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

export default authMiddleware;
