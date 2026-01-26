import { Router } from "express";
import { getAdminDashboardHandler, getSellerDashboardHandler } from "./dashboard.controller";
import authMiddleware, { authorize } from "@/internal/middleware/auth";
import { asyncHandler } from "@/internal/middleware/async";

const dashboardRoutes = Router();

dashboardRoutes.use(authMiddleware);

dashboardRoutes.get("/admin", authorize(["admin"]), asyncHandler(getAdminDashboardHandler));
dashboardRoutes.get("/seller", authorize(["user"]), asyncHandler(getSellerDashboardHandler));

export default dashboardRoutes;
