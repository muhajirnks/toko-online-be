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

const productRoutes = Router();

// Everyone can view products (Buyer View)
productRoutes.get("/", listProductsHandler);

// Seller specific routes (Protected)
productRoutes.get(
   "/seller",
   authMiddleware,
   authorize(["user"]),
   listSellerProductsHandler,
);

// Public detail route
productRoutes.get("/:id", getProductByIdHandler);

// Middleware for other seller management routes
productRoutes.use(authMiddleware, authorize(["user"]));

productRoutes.post("/", uploadProductImage, createProductHandler);
productRoutes.put("/:id", uploadProductImage, updateProductHandler);
productRoutes.delete("/:id", deleteProductHandler);

export default productRoutes;
