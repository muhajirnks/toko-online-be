import { Router } from "express";
import {
   getAdminDashboardHandler,
   getSellerDashboardHandler,
} from "./dashboard.controller";
import authMiddleware, { authorize } from "@/internal/middleware/auth";

const dashboardRoutes = Router();

dashboardRoutes.use(authMiddleware);

dashboardRoutes.get("/admin", authorize(["admin"]), getAdminDashboardHandler);
dashboardRoutes.get("/seller", authorize(["user"]), getSellerDashboardHandler);

export default dashboardRoutes;
