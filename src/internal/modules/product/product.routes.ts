import { Router } from "express";
import {
   createProductHandler,
   deleteProductHandler,
   getAllProductsHandler,
   getProductByIdHandler,
   updateProductHandler,
} from "./product.controller";

const productRoutes = Router();

productRoutes.get("/", getAllProductsHandler);
productRoutes.get("/:id", getProductByIdHandler);
productRoutes.post("/", createProductHandler);
productRoutes.put("/:id", updateProductHandler);
productRoutes.delete("/:id", deleteProductHandler);

export default productRoutes;
