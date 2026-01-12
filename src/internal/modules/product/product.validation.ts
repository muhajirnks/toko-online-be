import * as yup from "yup";

export const listProductSchema = yup.object({
   page: yup.number().optional().min(1),
   limit: yup.number().optional().min(1).max(100),
   sort: yup.string().optional(),
   direction: yup.string().oneOf(["asc", "desc"]).optional(),
   search: yup.string().optional(),
   category: yup.string().optional(),
   minPrice: yup.number().optional().min(0),
   maxPrice: yup.number().optional().min(0),
   sellerId: yup.string().optional(),
})

export const createProductSchema = yup.object({
   name: yup.string().required(),
   description: yup.string().required(),
   price: yup.number().required().min(0),
   stock: yup.number().required().min(0),
   image: yup.mixed().required(),
   categoryId: yup.string().required(),
});

export const updateProductSchema = yup.object({
   name: yup.string().required(),
   description: yup.string().required(),
   price: yup.number().required().min(0),
   stock: yup.number().required().min(0),
   image: yup.mixed().optional(),
   categoryId: yup.string().required(),
});

export type ListProductRequest = yup.InferType<typeof listProductSchema>
export type CreateProductRequest = yup.InferType<typeof createProductSchema>
export type UpdateProductRequest = yup.InferType<typeof updateProductSchema>
