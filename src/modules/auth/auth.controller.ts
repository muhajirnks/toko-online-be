import { loginSuccess, logoutSuccess } from "@/helpers/responseMessage";
import { loginService } from "./auth.service";
import { Request, Response } from "express";

export const loginHandler = async (req: Request, res: Response) => {
   const { email, password } = req.body;

   try {
      const { token, data } = await loginService(email, password);

      // Set Cookie
      res.cookie("token", token, {
         httpOnly: true,
         secure: true,
         sameSite: "none",
         maxAge: 24 * 60 * 60 * 1000,
      });
      res.json({ message: loginSuccess, data });
   } catch (err: any) {
      res.status(401).json({ message: err.message });
   }
};

export const getProfileHandler = async (req: Request, res: Response) => {
   res.json({ data: req.user });
};

export const logoutHandler = (_: Request, res: Response) => {
   // Clear Cookie
   res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
   });
   res.json({ message: logoutSuccess });
};
