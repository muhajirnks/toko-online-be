import * as yup from "yup";

export const listCategorySchema = yup.object({
   page: yup.number().optional().min(1).default(1),
   limit: yup.number().optional().min(1).max(100).default(10),
   sort: yup
      .string()
      .optional()
      .oneOf(["_id", "name", "description", "createdAt", "updatedAt"])
      .default("_id"),
   direction: yup.string().oneOf(["asc", "desc"]).optional().default("desc"),
   search: yup.string().optional(),
});

export const createCategorySchema = yup.object({
   name: yup.string().required(),
   description: yup.string().optional(),
});

export const updateCategorySchema = yup.object({
   name: yup.string().optional(),
   description: yup.string().optional(),
});

export type ListCategoryRequest = yup.InferType<typeof listCategorySchema>;
export type CreateCategoryRequest = yup.InferType<typeof createCategorySchema>;
export type UpdateCategoryRequest = yup.InferType<typeof updateCategorySchema>;
