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

// Buyer can create orders
orderRoutes.post("/", authorize(["buyer"]), asyncHandler(createOrderHandler));

// Admin, Seller, and Buyer can view orders (with role-based filtering in service)
orderRoutes.get("/", authorize(["admin", "seller", "buyer"]), asyncHandler(listOrdersHandler));
orderRoutes.get("/:id", authorize(["admin", "seller", "buyer"]), asyncHandler(getOrderByIdHandler));

// Only admin can update/delete orders
orderRoutes.put("/:id", authorize(["admin"]), asyncHandler(updateOrderHandler));
orderRoutes.delete("/:id", authorize(["admin"]), asyncHandler(deleteOrderHandler));

export default orderRoutes;
