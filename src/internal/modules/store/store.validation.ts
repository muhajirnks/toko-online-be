import * as yup from "yup";

export const createStoreSchema = yup.object({
   name: yup.string().required("Store name is required"),
});

export const updateStoreSchema = yup.object({
   name: yup.string().required("Store name is required"),
});

export type CreateStoreRequest = yup.InferType<typeof createStoreSchema>;
export type UpdateStoreRequest = yup.InferType<typeof updateStoreSchema>;
