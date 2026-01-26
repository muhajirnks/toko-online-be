import { Request, Response } from "express";
import { getAdminDashboardService, getSellerDashboardService } from "./dashboard.service";
import { successResponse } from "@/pkg/response/success";

export const getAdminDashboardHandler = async (req: Request, res: Response) => {
   const data = await getAdminDashboardService();
   successResponse(res, { data });
};

export const getSellerDashboardHandler = async (req: Request, res: Response) => {
   const data = await getSellerDashboardService(req.user!);
   successResponse(res, { data });
};
