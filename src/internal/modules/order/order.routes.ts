import { Router } from "express";
import {
   createOrderHandler,
   deleteOrderHandler,
   getAllOrdersHandler,
   getOrderByIdHandler,
   updateOrderHandler,
} from "./order.controller";
import authMiddleware, { authorize } from "@/internal/middleware/auth";

const orderRoutes = Router();

orderRoutes.use(authMiddleware);

// Buyer can create orders
orderRoutes.post("/", authorize(["buyer"]), createOrderHandler);

// Admin, Seller, and Buyer can view orders (with role-based filtering in service)
orderRoutes.get("/", authorize(["admin", "seller", "buyer"]), getAllOrdersHandler);
orderRoutes.get("/:id", authorize(["admin", "seller", "buyer"]), getOrderByIdHandler);

// Only admin can update/delete orders
orderRoutes.put("/:id", authorize(["admin"]), updateOrderHandler);
orderRoutes.delete("/:id", authorize(["admin"]), deleteOrderHandler);

export default orderRoutes;
