import {
   createProduct,
   deleteProduct,
   findAllProducts,
   findProductById,
   updateProduct,
} from "./product.repo";
import { NewForbiddenError, NewNotFoundError } from "@/pkg/apperror/appError";
import { ProductSchema } from "@/internal/models/product";
import { uploadFile } from "@/pkg/cloudinary/cloudinary";
import {
   CreateProductRequest,
   ListProductRequest,
   UpdateProductRequest,
} from "./product.validation";
import mongoose, { HydratedDocument } from "mongoose";
import { UserSchema } from "@/internal/models/user";
import { findStoreByUserId } from "../store/store.repo";

export const listProductsService = async (query: ListProductRequest) => {
   const items = await findAllProducts(query);
   return items;
};

export const getProductByIdService = async (id: string) => {
   const product = await findProductById(id);
   if (!product) {
      throw NewNotFoundError("Product not found");
   }

   return product;
};

export const createProductService = async (
   data: CreateProductRequest,
   user: HydratedDocument<UserSchema>
) => {
   const store = await findStoreByUserId(user.id);
   if (!store) {
      throw NewNotFoundError("You must have a store to create a product");
   }

   const product: Partial<ProductSchema> = {
      name: data.name,
      category: new mongoose.Types.ObjectId(data.categoryId),
      description: data.description,
      price: data.price,
      store: store._id,
      stock: data.stock,
   };
   const { publicPath } = await uploadFile(data.image, "products");
   product.imageUrl = publicPath;

   const result = await createProduct(product);

   return result;
};

export const updateProductService = async (
   id: string,
   data: UpdateProductRequest,
   user: HydratedDocument<UserSchema>
) => {
   const product = await findProductById(id);
   if (!product) {
      throw NewNotFoundError("Product not found");
   }

   const store = await findStoreByUserId(user.id);
   if (!store || product.store._id.toString() !== store._id.toString()) {
      throw NewForbiddenError("You are not authorized to update this product");
   }

   const updatedData: Partial<ProductSchema> = {
      name: data.name,
      category: new mongoose.Types.ObjectId(data.categoryId),
      description: data.description,
      price: data.price,
      stock: data.stock,
   };

   if (data.image) {
      const { publicPath } = await uploadFile(data.image, "products");
      updatedData.imageUrl = publicPath;
   }

   return await updateProduct(id, updatedData);
};

export const deleteProductService = async (id: string, userId: string) => {
   const product = await findProductById(id);
   if (!product) {
      throw NewNotFoundError("Product not found");
   }

   const store = await findStoreByUserId(userId);
   if (!store || product.store._id.toString() !== store._id.toString()) {
      throw NewForbiddenError("You are not authorized to delete this product");
   }

   return await deleteProduct(id);
};
