import { Router } from "express";
import { createMyStore, getMyStore, updateMyStore } from "./store.controller";
import authMiddleware, { authorize } from "@/internal/middleware/auth";
import { uploadStoreAvatar } from "@/internal/middleware/upload";

const router = Router();

router.use(authMiddleware);
router.use(authorize(["user"]));

router.get("/me", getMyStore);
router.post("/", uploadStoreAvatar, createMyStore);
router.put("/", uploadStoreAvatar, updateMyStore);

export default router;
