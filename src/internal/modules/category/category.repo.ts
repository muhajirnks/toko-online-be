import Category, { CategorySchema } from "@/internal/models/category";
import { ListCategoryRequest } from "./category.validation";

export const findAllCategories = async (query: ListCategoryRequest) => {
   return await Category.find().lean().exec();
};

export const findCategoryById = async (id: string) => {
   return await Category.findById(id).lean().exec();
};

export const createCategory = async (data: Partial<CategorySchema>) => {
   const result = await Category.create(data);
   return result.toObject();
};

export const updateCategory = async (id: string, data: Partial<CategorySchema>) => {
   return await Category.findByIdAndUpdate(id, data, { new: true }).exec();
};

export const deleteCategory = async (id: string) => {
   return await Category.findByIdAndDelete(id).exec();
};
