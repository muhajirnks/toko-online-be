import { createOrder, findAllOrders, findOrderById, updateOrder } from "./order.repo";
import { findProductById, updateProduct } from "../product/product.repo";
import { NewBadRequestError, NewNotFoundError } from "@/pkg/apperror/appError";

export interface CreateOrderInput {
   customerName: string;
   customerEmail: string;
   items: {
      productId: string;
      quantity: number;
   }[];
   userId?: string;
}

export const getAllOrdersService = async () => {
   return await findAllOrders();
};

export const getOrderByIdService = async (id: string) => {
   const order = await findOrderById(id);
   if (!order) {
      throw NewNotFoundError("Order not found");
   }
   return order;
};

export const createOrderService = async (data: CreateOrderInput) => {
   const { items, customerName, customerEmail, userId } = data;
   let totalAmount = 0;
   const orderItems = [];

   for (const item of items) {
      const product = await findProductById(item.productId);
      if (!product) {
         throw NewNotFoundError(`Product with ID ${item.productId} not found`);
      }

      if (product.stock < item.quantity) {
         throw NewBadRequestError(`Product ${product.name} is out of stock`);
      }

      const price = product.price;
      totalAmount += price * item.quantity;

      orderItems.push({
         productId: product._id,
         name: product.name,
         quantity: item.quantity,
         price: price,
      });

      // Update stock
      await updateProduct(product.id, { stock: product.stock - item.quantity });
   }

   const orderData = {
      userId,
      customerName,
      customerEmail,
      items: orderItems,
      totalAmount,
      status: "pending",
   };

   return await createOrder(orderData);
};

export const updateOrderStatusService = async (id: string, status: string) => {
   const order = await findOrderById(id);
   if (!order) {
      throw NewNotFoundError("Order not found");
   }

   return await updateOrder(id, { status });
};
