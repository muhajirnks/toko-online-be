import { Router } from "express";
import {
   createMyStore,
   getMyStore,
   updateMyStore,
} from "./store.controller";
import authMiddleware, { authorize } from "@/internal/middleware/auth";
import { asyncHandler } from "@/internal/middleware/async";
import { uploadStoreAvatar } from "@/internal/middleware/upload";

const router = Router();

router.use(authMiddleware);
router.use(authorize(["user"]));

router.get("/me", asyncHandler(getMyStore));
router.post("/", uploadStoreAvatar, asyncHandler(createMyStore));
router.put("/", uploadStoreAvatar, asyncHandler(updateMyStore));

export default router;
