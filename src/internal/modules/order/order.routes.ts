import { Router } from "express";
import {
   createOrderHandler,
   deleteOrderHandler,
   listBuyerOrdersHandler,
   listSellerOrdersHandler,
   getOrderByIdHandler,
   updateOrderHandler,
} from "./order.controller";
import authMiddleware, { authorize } from "@/internal/middleware/auth";

const orderRoutes = Router();

orderRoutes.use(authMiddleware);

// User can create orders
orderRoutes.post("/", authorize(["user"]), createOrderHandler);

// List orders
orderRoutes.get("/", authorize(["user"]), listBuyerOrdersHandler);
orderRoutes.get("/seller", authorize(["user"]), listSellerOrdersHandler);

orderRoutes.get("/:id", authorize(["admin", "user"]), getOrderByIdHandler);

// Admin and User (with store) can update status
orderRoutes.put("/:id", authorize(["admin", "user"]), updateOrderHandler);
orderRoutes.delete("/:id", authorize(["admin"]), deleteOrderHandler);

export default orderRoutes;
