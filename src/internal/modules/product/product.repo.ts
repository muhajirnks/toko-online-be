import Product, { ProductSchema } from "@/internal/models/product";

export const findAllProducts = async (query: any = {}) => {
   return await Product.find(query).populate("category").populate("sellerId").exec();
};

export const findProductById = async (id: string) => {
   return await Product.findById(id).populate("category").populate("sellerId").exec();
};

export const createProduct = async (data: Partial<ProductSchema>) => {
   return await Product.create(data);
};

export const updateProduct = async (id: string, data: Partial<ProductSchema>) => {
   return await Product.findByIdAndUpdate(id, data, { new: true }).exec();
};

export const deleteProduct = async (id: string) => {
   return await Product.findByIdAndDelete(id).exec();
};
