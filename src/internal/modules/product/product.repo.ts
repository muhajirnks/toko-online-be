import Product, { ProductSchema } from "@/internal/models/product";
import { ListProductRequest } from "./product.validation";

export const findAllProducts = async (query: ListProductRequest) => {
   const filter: any = {};

   if (query.search) {
      filter.name = { $regex: query.search, $options: "i" };
   }

   if (query.category) {
      filter.category = query.category;
   }

   if (query.storeId) {
      filter.store = query.storeId;
   }

   if (query.minPrice !== undefined || query.maxPrice !== undefined) {
      filter.price = {};
      if (query.minPrice !== undefined) filter.price.$gte = query.minPrice;
      if (query.maxPrice !== undefined) filter.price.$lte = query.maxPrice;
   }

   return await Product.paginate(filter, {
      page: query.page,
      limit: query.limit,
      sort: [[query.sort, query.direction], ["_id", "desc"]],
      lean: true,
      populate: ["category", "store"],
   });
};

export const findProductById = async (id: string) => {
   return await Product.findById(id).populate("category").populate("store").lean().exec();
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
