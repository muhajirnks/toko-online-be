import { Router } from "express";
import authRoutes from "@/internal/modules/auth/auth.routes";
import productRoutes from "@/internal/modules/product/product.routes";
import orderRoutes from "@/internal/modules/order/order.routes";

const initV1Route = () => {
   const router = Router();

   router.use("/auth", authRoutes);
   router.use("/products", productRoutes);
   router.use("/orders", orderRoutes);

   return router;
};

export default initV1Route;