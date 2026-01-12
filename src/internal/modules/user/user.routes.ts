import { Router } from "express";
import {
   deleteUserHandler,
   getAllUsersHandler,
   getUserByIdHandler,
   updateUserHandler,
} from "./user.controller";
import authMiddleware, { authorize } from "@/internal/middleware/auth";
import { asyncHandler } from "@/internal/middleware/async";

const userRoutes = Router();

// Only admin can manage users
userRoutes.use(authMiddleware, authorize(["admin"]));

userRoutes.get("/", asyncHandler(getAllUsersHandler));
userRoutes.get("/:id", asyncHandler(getUserByIdHandler));
userRoutes.put("/:id", asyncHandler(updateUserHandler));
userRoutes.delete("/:id", asyncHandler(deleteUserHandler));

export default userRoutes;
