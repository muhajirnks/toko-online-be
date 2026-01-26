import { Router } from "express";
import {
   createOrderHandler,
   deleteOrderHandler,
   listOrdersHandler,
   getOrderByIdHandler,
   updateOrderHandler,
} from "./order.controller";
import authMiddleware, { authorize } from "@/internal/middleware/auth";
import { asyncHandler } from "@/internal/middleware/async";

const orderRoutes = Router();

orderRoutes.use(authMiddleware);

// User can create orders
orderRoutes.post("/", authorize(["user"]), asyncHandler(createOrderHandler));

// Admin and User can view orders (with role-based filtering in service)
orderRoutes.get("/", authorize(["admin", "user"]), asyncHandler(listOrdersHandler));
orderRoutes.get("/:id", authorize(["admin", "user"]), asyncHandler(getOrderByIdHandler));

// Admin and User (with store) can update status
orderRoutes.put("/:id", authorize(["admin", "user"]), asyncHandler(updateOrderHandler));
orderRoutes.delete("/:id", authorize(["admin"]), asyncHandler(deleteOrderHandler));

export default orderRoutes;
