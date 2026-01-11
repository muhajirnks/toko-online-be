import * as yup from "yup";

export const createProductSchema = yup.object({
   name: yup.string().required(),
   description: yup.string().required(),
   price: yup.number().required().min(0),
   stock: yup.number().required().min(0),
   image: yup.string().optional(),
   category: yup.string().optional(),
});

export const updateProductSchema = yup.object({
   name: yup.string().optional(),
   description: yup.string().optional(),
   price: yup.number().optional().min(0),
   stock: yup.number().optional().min(0),
   image: yup.string().optional(),
   category: yup.string().optional(),
});
