import {
   createProduct,
   deleteProduct,
   findAllProducts,
   findProductById,
   updateProduct,
} from "./product.repo";
import { NewForbiddenError, NewNotFoundError } from "@/pkg/apperror/appError";
import { ProductSchema } from "@/internal/models/product";

export const getAllProductsService = async () => {
   return await findAllProducts();
};

export const getProductByIdService = async (id: string) => {
   const product = await findProductById(id);
   if (!product) {
      throw NewNotFoundError("Product not found");
   }
   return product;
};

export const createProductService = async (data: Partial<ProductSchema>) => {
   return await createProduct(data);
};

export const updateProductService = async (id: string, data: Partial<ProductSchema>, sellerId: string) => {
   const product = await findProductById(id);
   if (!product) {
      throw NewNotFoundError("Product not found");
   }

   if (product.sellerId.toString() !== sellerId) {
      throw NewForbiddenError("You are not authorized to update this product");
   }

   return await updateProduct(id, data);
};

export const deleteProductService = async (id: string, sellerId: string) => {
   const product = await findProductById(id);
   if (!product) {
      throw NewNotFoundError("Product not found");
   }

   if (product.sellerId.toString() !== sellerId) {
      throw NewForbiddenError("You are not authorized to delete this product");
   }

   return await deleteProduct(id);
};
