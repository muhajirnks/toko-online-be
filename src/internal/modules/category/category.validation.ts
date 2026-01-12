import * as yup from "yup";

export const createCategorySchema = yup.object({
   name: yup.string().required(),
   description: yup.string().optional(),
});

export const updateCategorySchema = yup.object({
   name: yup.string().optional(),
   description: yup.string().optional(),
});
