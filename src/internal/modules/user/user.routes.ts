import { Router } from "express";
import {
   deleteUserHandler,
   listUsersHandler,
   getUserByIdHandler,
   updateUserHandler,
} from "./user.controller";
import authMiddleware, { authorize } from "@/internal/middleware/auth";

const userRoutes = Router();

// Only admin can manage users
userRoutes.use(authMiddleware, authorize(["admin"]));

userRoutes.get("/", listUsersHandler);
userRoutes.get("/:id", getUserByIdHandler);
userRoutes.put("/:id", updateUserHandler);
userRoutes.delete("/:id", deleteUserHandler);

export default userRoutes;
