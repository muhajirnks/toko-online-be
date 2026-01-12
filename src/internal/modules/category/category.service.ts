import {
   createCategory,
   deleteCategory,
   findAllCategories,
   findCategoryById,
   updateCategory,
} from "./category.repo";
import { NewNotFoundError } from "@/pkg/apperror/appError";
import { CategorySchema } from "@/internal/models/category";
import { CreateCategoryRequest, ListCategoryRequest, UpdateCategoryRequest } from "./category.validation";

export const listCategoriesService = async (query: ListCategoryRequest) => {
   return await findAllCategories(query);
};

export const getCategoryByIdService = async (id: string) => {
   const category = await findCategoryById(id);
   if (!category) {
      throw NewNotFoundError("Category not found");
   }
   return category;
};

export const createCategoryService = async (data: CreateCategoryRequest) => {
   return await createCategory(data);
};

export const updateCategoryService = async (id: string, data: UpdateCategoryRequest) => {
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
