import { Router } from "express";
import {
   createOrderHandler,
   getAllOrdersHandler,
   getOrderByIdHandler,
   updateOrderStatusHandler,
} from "./order.controller";

const orderRoutes = Router();

orderRoutes.get("/", getAllOrdersHandler);
orderRoutes.get("/:id", getOrderByIdHandler);
orderRoutes.post("/", createOrderHandler);
orderRoutes.patch("/:id/status", updateOrderStatusHandler);

export default orderRoutes;
