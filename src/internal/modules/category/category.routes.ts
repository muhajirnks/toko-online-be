import { Router } from "express";
import {
   createCategoryHandler,
   deleteCategoryHandler,
   listCategoriesHandler,
   getCategoryByIdHandler,
   updateCategoryHandler,
} from "./category.controller";
import authMiddleware, { authorize } from "@/internal/middleware/auth";
import { asyncHandler } from "@/internal/middleware/async";

const categoryRoutes = Router();

// Public can view categories
categoryRoutes.get("/", asyncHandler(listCategoriesHandler));
categoryRoutes.get("/:id", asyncHandler(getCategoryByIdHandler));

// Only admin can manage categories
categoryRoutes.use(authMiddleware, authorize(["admin"]));
categoryRoutes.post("/", asyncHandler(createCategoryHandler));
categoryRoutes.put("/:id", asyncHandler(updateCategoryHandler));
categoryRoutes.delete("/:id", asyncHandler(deleteCategoryHandler));

export default categoryRoutes;
