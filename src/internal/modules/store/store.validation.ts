import * as yup from "yup";

export const createStoreSchema = yup.object({
   name: yup.string().required("Store name is required"),
   description: yup.string().nullable().optional(),
   avatar: yup.mixed<Express.Multer.File>().nullable().optional(),
});

export const updateStoreSchema = yup.object({
   name: yup.string().required("Store name is required"),
   description: yup.string().nullable().optional(),
   avatar: yup.mixed<Express.Multer.File>().nullable().optional(),
});

export type CreateStoreRequest = yup.InferType<typeof createStoreSchema>;
export type UpdateStoreRequest = yup.InferType<typeof updateStoreSchema>;
