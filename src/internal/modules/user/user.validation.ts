import * as yup from "yup";

export const listUserSchema = yup.object({
   page: yup.number().optional().min(1).default(1),
   limit: yup.number().optional().min(1).max(100).default(10),
   sort: yup
      .string()
      .optional()
      .oneOf(["_id", "name", "email", "role", "createdAt", "updatedAt"])
      .default("_id"),
   direction: yup.string().oneOf(["asc", "desc"]).optional().default("desc"),
   search: yup.string().optional(),
   role: yup.string().oneOf(["admin", "user"]).optional(),
});

export const updateUserSchema = yup.object({
   name: yup.string().optional(),
   email: yup.string().email().optional(),
   role: yup.string().oneOf(["admin", "user"]).optional(),
   password: yup.string().min(8).optional(),
});

export type ListUserRequest = yup.InferType<typeof listUserSchema>;
export type UpdateUserRequest = yup.InferType<typeof updateUserSchema>;
