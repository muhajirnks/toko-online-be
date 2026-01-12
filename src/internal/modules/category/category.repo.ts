import Category, { CategorySchema } from "@/internal/models/category";

export const findAllCategories = async () => {
   return await Category.find().exec();
};

export const findCategoryById = async (id: string) => {
   return await Category.findById(id).exec();
};

export const createCategory = async (data: Partial<CategorySchema>) => {
   return await Category.create(data);
};

export const updateCategory = async (id: string, data: Partial<CategorySchema>) => {
   return await Category.findByIdAndUpdate(id, data, { new: true }).exec();
};

export const deleteCategory = async (id: string) => {
   return await Category.findByIdAndDelete(id).exec();
};
