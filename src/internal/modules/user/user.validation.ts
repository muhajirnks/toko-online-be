import * as yup from "yup";

export const listUserSchema = yup.object({
   page: yup.number().optional().min(1),
   limit: yup.number().optional().min(1).max(100),
   sort: yup.string().optional(),
   direction: yup.string().oneOf(["asc", "desc"]).optional(),
   search: yup.string().optional(),
   role: yup.string().oneOf(["admin", "seller", "buyer"]).optional(),
});

export const updateUserSchema = yup.object({
   name: yup.string().optional(),
   email: yup.string().email().optional(),
   role: yup.string().oneOf(["admin", "seller", "buyer"]).optional(),
   password: yup.string().min(8).optional(),
});

export type ListUserRequest = yup.InferType<typeof listUserSchema>
export type UpdateUserRequest = yup.InferType<typeof updateUserSchema>

