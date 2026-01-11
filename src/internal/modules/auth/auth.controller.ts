import { createdResponse, successResponse, tokenResponse } from "@/pkg/response/success";
import { loginService, logoutService, refreshService, registerService } from "./auth.service";
import { Request, Response } from "express";
import { loginSchema, logoutSchema, refreshSchema, registerSchema } from "./auth.validation";

export const registerHandler = async (req: Request, res: Response) => {
   const body = await registerSchema.validate(req.body);

   const data = await registerService(body);

   createdResponse(res, {
      data,
      message: "Register success",
   });
};

export const loginHandler = async (req: Request, res: Response) => {
   const { email, password } = await loginSchema.validate(req.body);

   const { token, data } = await loginService(email, password);

   tokenResponse(res, {
      data,
      token,
      message: "Login success",
   });
};

export const refreshHandler = async (req: Request, res: Response) => {
   const { refresh_token } = await refreshSchema.validate({refresh_token: req.cookies.refresh_token});

   const { token, data } = await refreshService(refresh_token);

   tokenResponse(res, {
      data,
      token,
      message: "Refresh token success",
   });
};

export const getProfileHandler = async (req: Request, res: Response) => {
   successResponse(res, {
      data: req.user,
   });
};

export const logoutHandler = async (req: Request, res: Response) => {
   const { refresh_token } = await logoutSchema.validate({refresh_token: req.cookies.refresh_token});

   await logoutService(refresh_token);

   // Clear Cookie
   res.clearCookie("access_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
   });

   res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
   });

   successResponse(res, {
      message: "Logout success",
   });
};
