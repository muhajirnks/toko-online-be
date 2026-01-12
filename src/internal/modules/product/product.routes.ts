import { Router } from "express";
import {
   createProductHandler,
   deleteProductHandler,
   getAllProductsHandler,
   getProductByIdHandler,
   updateProductHandler,
} from "./product.controller";
import authMiddleware, { authorize } from "@/internal/middleware/auth";

const productRoutes = Router();

// Everyone can view products
productRoutes.get("/", getAllProductsHandler);
productRoutes.get("/:id", getProductByIdHandler);

// Only seller can manage products
productRoutes.use(authMiddleware, authorize(["seller"]));
productRoutes.post("/", createProductHandler);
productRoutes.put("/:id", updateProductHandler);
productRoutes.delete("/:id", deleteProductHandler);

export default productRoutes;
