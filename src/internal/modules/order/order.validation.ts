import * as yup from "yup";

export const createOrderSchema = yup.object({
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

export const listOrderBaseSchema = {
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
};

export const listBuyerOrderSchema = yup.object({
   ...listOrderBaseSchema,
   storeId: yup.string().optional(),
});

export const listSellerOrderSchema = yup.object({
   ...listOrderBaseSchema,
   userId: yup.string().optional(),
});

export type ListBuyerOrderRequest = yup.InferType<typeof listBuyerOrderSchema>;
export type ListSellerOrderRequest = yup.InferType<typeof listSellerOrderSchema>;
export type CreateOrderRequest = yup.InferType<typeof createOrderSchema>;
export type UpdateOrderStatusRequest = yup.InferType<
   typeof updateOrderStatusSchema
>;
