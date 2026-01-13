import * as yup from "yup";

export const listProductSchema = yup.object({
   page: yup.number().optional().min(1).default(1),
   limit: yup.number().optional().min(1).max(100).default(10),
   sort: yup
      .string()
      .optional()
      .oneOf([
         "_id",
         "name",
         "description",
         "price",
         "stock",
         "imageUrl",
         "createdAt",
         "updatedAt",
      ])
      .default("_id"),
   direction: yup.string().optional().oneOf(["asc", "desc"]).default("desc"),
   search: yup.string().optional(),
   category: yup.string().optional(),
   minPrice: yup.number().optional().min(0),
   maxPrice: yup.number().optional().min(0),
   sellerId: yup.string().optional(),
});

export const createProductSchema = yup.object({
   name: yup.string().required(),
   description: yup.string().required(),
   price: yup.number().required().min(0),
   stock: yup.number().required().min(0),
   image: yup.mixed<Express.Multer.File>().required(),
   categoryId: yup.string().required(),
});

export const updateProductSchema = yup.object({
   name: yup.string().required(),
   description: yup.string().required(),
   price: yup.number().required().min(0),
   stock: yup.number().required().min(0),
   image: yup.mixed<Express.Multer.File>().optional(),
   categoryId: yup.string().required(),
});

export type ListProductRequest = yup.InferType<typeof listProductSchema>;
export type CreateProductRequest = yup.InferType<typeof createProductSchema>;
export type UpdateProductRequest = yup.InferType<typeof updateProductSchema>;
