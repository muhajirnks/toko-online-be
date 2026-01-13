import {
   createProduct,
   deleteProduct,
   findAllProducts,
   findProductById,
   updateProduct,
} from "./product.repo";
import { NewForbiddenError, NewNotFoundError } from "@/pkg/apperror/appError";
import { ProductSchema } from "@/internal/models/product";
import { presignGetUrl, uploadFile } from "@/pkg/minio/minio";
import { CreateProductRequest, ListProductRequest, UpdateProductRequest } from "./product.validation";
import mongoose, { HydratedDocument } from "mongoose";
import { UserSchema } from "@/internal/models/user";

export const listProductsService = async (query: ListProductRequest) => {
   const items = await findAllProducts(query);
   const withBaseUrl = await Promise.all(
      items.map(async (p) => {
         if (p.imageUrl) {
            return { ...p, imageUrl: process.env.MINIO_BASE_URL + "/" + p.imageUrl };
         }
         return p;
      })
   );
   return withBaseUrl;
};

export const getProductByIdService = async (id: string) => {
   const product = await findProductById(id);
   if (!product) {
      throw NewNotFoundError("Product not found");
   }

   product.imageUrl = await presignGetUrl(product.imageUrl)
   return product;
};

export const createProductService = async (
   data: CreateProductRequest,
   user: HydratedDocument<UserSchema>
) => {
   const product: Partial<ProductSchema> = {
      name: data.name,
      category: new mongoose.Types.ObjectId(data.categoryId),
      description: data.description,
      price: data.price,
      seller: new mongoose.Types.ObjectId(user.id),
      stock: data.stock,
   }
   const { publicPath } = await uploadFile(data.image, "products");
   product.imageUrl = publicPath;

   const result = await createProduct(product);
   result.imageUrl = process.env.MINIO_BASE_URL + "/" + product.imageUrl

   return result
};

export const updateProductService = async (
   id: string,
   data: UpdateProductRequest,
   user: HydratedDocument<UserSchema>,
) => {
   const product = await findProductById(id);
   if (!product) {
      throw NewNotFoundError("Product not found");
   }

   if (product.seller.toString() !== user.id) {
      throw NewForbiddenError("You are not authorized to update this product");
   }

   if (data.image) {
      const { publicPath } = await uploadFile(data.image, "products");
      product.imageUrl = publicPath;
   }

   product.name = data.name;
   product.category = new mongoose.Types.ObjectId(data.categoryId);
   product.description = data.description;
   product.price = data.price;
   product.seller = new mongoose.Types.ObjectId(user.id);
   product.stock = data.stock;

   return await updateProduct(id, product);
};

export const deleteProductService = async (id: string, sellerId: string) => {
   const product = await findProductById(id);
   if (!product) {
      throw NewNotFoundError("Product not found");
   }

   if (product.seller.toString() !== sellerId) {
      throw NewForbiddenError("You are not authorized to delete this product");
   }

   return await deleteProduct(id);
};
