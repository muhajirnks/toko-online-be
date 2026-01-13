import Product, { ProductSchema } from "@/internal/models/product";
import { ListProductRequest } from "./product.validation";

export const findAllProducts = async (query: ListProductRequest) => {
   return await Product.paginate({}, {
      page: query.page,
      limit: query.limit,
      sort: [[query.sort, query.direction], ["_id", "desc"]],
      lean: true,
      populate: ["category", "seller"],
   });
};

export const findProductById = async (id: string) => {
   return await Product.findById(id).populate("category").populate("seller").lean().exec();
};

export const createProduct = async (data: Partial<ProductSchema>) => {
   const doc = await Product.create(data);
   return doc.toObject();
};

export const updateProduct = async (id: string, data: Partial<ProductSchema>) => {
   return await Product.findByIdAndUpdate(id, data, { new: true }).lean().exec();
};

export const deleteProduct = async (id: string) => {
   return await Product.findByIdAndDelete(id).exec();
};
