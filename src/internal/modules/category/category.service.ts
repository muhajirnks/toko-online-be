import {
   createCategory,
   deleteCategory,
   findAllCategories,
   findCategoryById,
   updateCategory,
} from "./category.repo";
import { NewNotFoundError } from "@/pkg/apperror/appError";
import { CategorySchema } from "@/internal/models/category";

export const getAllCategoriesService = async () => {
   return await findAllCategories();
};

export const getCategoryByIdService = async (id: string) => {
   const category = await findCategoryById(id);
   if (!category) {
      throw NewNotFoundError("Category not found");
   }
   return category;
};

export const createCategoryService = async (data: Partial<CategorySchema>) => {
   return await createCategory(data);
};

export const updateCategoryService = async (id: string, data: Partial<CategorySchema>) => {
   const category = await findCategoryById(id);
   if (!category) {
      throw NewNotFoundError("Category not found");
   }
   return await updateCategory(id, data);
};

export const deleteCategoryService = async (id: string) => {
   const category = await findCategoryById(id);
   if (!category) {
      throw NewNotFoundError("Category not found");
   }
   return await deleteCategory(id);
};
