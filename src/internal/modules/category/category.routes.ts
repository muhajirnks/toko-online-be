import { Router } from "express";
import {
   createCategoryHandler,
   deleteCategoryHandler,
   listCategoriesHandler,
   getCategoryByIdHandler,
   updateCategoryHandler,
} from "./category.controller";
import authMiddleware, { authorize } from "@/internal/middleware/auth";

const categoryRoutes = Router();

// Public can view categories
categoryRoutes.get("/", listCategoriesHandler);
categoryRoutes.get("/:id", getCategoryByIdHandler);

// Only admin can manage categories
categoryRoutes.use(authMiddleware, authorize(["admin"]));
categoryRoutes.post("/", createCategoryHandler);
categoryRoutes.put("/:id", updateCategoryHandler);
categoryRoutes.delete("/:id", deleteCategoryHandler);

export default categoryRoutes;
