import { Router } from "express";
import {
   createProductHandler,
   deleteProductHandler,
   getAllProductsHandler,
   getProductByIdHandler,
   updateProductHandler,
} from "./product.controller";
import authMiddleware, { authorize } from "@/internal/middleware/auth";
import { uploadProductImage } from "@/internal/middleware/upload";
import { asyncHandler } from "@/internal/middleware/async";

const productRoutes = Router();

// Everyone can view products
productRoutes.get("/", asyncHandler(getAllProductsHandler));
productRoutes.get("/:id", asyncHandler(getProductByIdHandler));

// Only seller can manage products
productRoutes.use(authMiddleware, authorize(["seller"]));
productRoutes.post("/", uploadProductImage, asyncHandler(createProductHandler));
productRoutes.put("/:id", uploadProductImage, asyncHandler(updateProductHandler));
productRoutes.delete("/:id", asyncHandler(deleteProductHandler));

export default productRoutes;
