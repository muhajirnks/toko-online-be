import { Router } from "express";
import {
   createProductHandler,
   deleteProductHandler,
   listProductsHandler,
   listSellerProductsHandler,
   getProductByIdHandler,
   updateProductHandler,
} from "./product.controller";
import authMiddleware, { authorize } from "@/internal/middleware/auth";
import { uploadProductImage } from "@/internal/middleware/upload";
import { asyncHandler } from "@/internal/middleware/async";

const productRoutes = Router();

// Everyone can view products (Buyer View)
productRoutes.get("/", asyncHandler(listProductsHandler));

// Seller specific routes (Protected)
productRoutes.get("/seller", authMiddleware, authorize(["user"]), asyncHandler(listSellerProductsHandler));

// Public detail route
productRoutes.get("/:id", asyncHandler(getProductByIdHandler));

// Middleware for other seller management routes
productRoutes.use(authMiddleware, authorize(["user"]));

productRoutes.post("/", uploadProductImage, asyncHandler(createProductHandler));
productRoutes.put("/:id", uploadProductImage, asyncHandler(updateProductHandler));
productRoutes.delete("/:id", asyncHandler(deleteProductHandler));

export default productRoutes;
