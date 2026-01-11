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
