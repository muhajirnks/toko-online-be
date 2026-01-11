import { createProduct, deleteProduct, findAllProducts, findProductById, updateProduct } from "./product.repo";
import { NewNotFoundError } from "@/pkg/apperror/appError";
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

export const updateProductService = async (id: string, data: Partial<ProductSchema>) => {
   const product = await findProductById(id);
   if (!product) {
      throw NewNotFoundError("Product not found");
   }
   return await updateProduct(id, data);
};

export const deleteProductService = async (id: string) => {
   const product = await findProductById(id);
   if (!product) {
      throw NewNotFoundError("Product not found");
   }
   return await deleteProduct(id);
};
