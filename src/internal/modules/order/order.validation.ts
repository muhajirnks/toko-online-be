import * as yup from "yup";

export const createOrderSchema = yup.object({
   customerName: yup.string().required(),
   customerEmail: yup.string().email().required(),
   items: yup
      .array()
      .of(
         yup.object({
            productId: yup.string().required(),
            quantity: yup.number().required().min(1),
         })
      )
      .required()
      .min(1),
});

export const updateOrderStatusSchema = yup.object({
   status: yup
      .string()
      .oneOf(["pending", "paid", "shipped", "completed", "cancelled"])
      .required(),
});

export const listOrderSchema = yup.object({
   page: yup.number().optional().min(1).default(1),
   limit: yup.number().optional().min(1).max(100).default(10),
   sort: yup
      .string()
      .optional()
      .oneOf(["_id", "customerName", "customerEmail", "createdAt", "updatedAt"])
      .default("_id"),
   direction: yup.string().oneOf(["asc", "desc"]).optional().default("desc"),
   search: yup.string().optional(),
   status: yup
      .string()
      .oneOf(["pending", "paid", "shipped", "completed", "cancelled"])
      .optional(),
   userId: yup.string().optional(),
   storeId: yup.string().optional(),
});

export type ListOrderRequest = yup.InferType<typeof listOrderSchema>;
export type CreateOrderRequest = yup.InferType<typeof createOrderSchema>;
export type UpdateOrderStatusRequest = yup.InferType<
   typeof updateOrderStatusSchema
>;
