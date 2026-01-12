import { Router } from "express";
import {
   getProfileHandler,
   loginHandler,
   logoutHandler,
   refreshHandler,
   registerHandler,
} from "./auth.controller";
import authMiddleware from "@/internal/middleware/auth";
import { asyncHandler } from "@/internal/middleware/async";

const router = Router();

router.post("/register", asyncHandler(registerHandler));
router.post("/login", asyncHandler(loginHandler));
router.post("/refresh", asyncHandler(refreshHandler));
router.get("/profile", authMiddleware, asyncHandler(getProfileHandler));
router.post("/logout", asyncHandler(logoutHandler));

export default router;
