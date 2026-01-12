import { Router } from "express";
import {
   createCategoryHandler,
   deleteCategoryHandler,
   getAllCategoriesHandler,
   getCategoryByIdHandler,
   updateCategoryHandler,
} from "./category.controller";

const categoryRoutes = Router();

categoryRoutes.get("/", getAllCategoriesHandler);
categoryRoutes.get("/:id", getCategoryByIdHandler);
categoryRoutes.post("/", createCategoryHandler);
categoryRoutes.put("/:id", updateCategoryHandler);
categoryRoutes.delete("/:id", deleteCategoryHandler);

export default categoryRoutes;
