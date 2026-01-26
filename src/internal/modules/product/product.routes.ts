import { Router } from "express";
import {
   createProductHandler,
   deleteProductHandler,
   listProductsHandler,
   getProductByIdHandler,
   updateProductHandler,
} from "./product.controller";
import authMiddleware, { authorize } from "@/internal/middleware/auth";
import { uploadProductImage } from "@/internal/middleware/upload";
import { asyncHandler } from "@/internal/middleware/async";

const productRoutes = Router();

// Everyone can view products
productRoutes.get("/", asyncHandler(listProductsHandler));
productRoutes.get("/:id", asyncHandler(getProductByIdHandler));

// Only user with store can manage products
productRoutes.use(authMiddleware, authorize(["user"]));
productRoutes.post("/", uploadProductImage, asyncHandler(createProductHandler));
productRoutes.put("/:id", uploadProductImage, asyncHandler(updateProductHandler));
productRoutes.delete("/:id", asyncHandler(deleteProductHandler));

export default productRoutes;
