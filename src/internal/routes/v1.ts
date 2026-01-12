import { Router } from "express";
import authRoutes from "@/internal/modules/auth/auth.routes";
import productRoutes from "@/internal/modules/product/product.routes";
import orderRoutes from "@/internal/modules/order/order.routes";
import categoryRoutes from "@/internal/modules/category/category.routes";

const initV1Route = () => {
   const router = Router();

   router.use("/auth", authRoutes);
   router.use("/products", productRoutes);
   router.use("/orders", orderRoutes);
   router.use("/categories", categoryRoutes);

   return router;
};

export default initV1Route;