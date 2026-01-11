import { Router } from "express";
import {
   getProfileHandler,
   loginHandler,
   logoutHandler,
} from "./auth.controller";
import authMiddleware from "@/middleware/authMiddleware";

const router = Router();

router.post("/login", loginHandler);
router.get("/profile", authMiddleware, getProfileHandler);
router.get("/logout", logoutHandler);

export default router;
