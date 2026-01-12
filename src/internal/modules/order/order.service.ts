import {
   createOrder,
   findAllOrders,
   findOrderById,
   findOrdersBySeller,
   findOrdersByUser,
   updateOrder,
} from "./order.repo";
import { findProductById, updateProduct } from "../product/product.repo";
import { NewBadRequestError, NewNotFoundError } from "@/pkg/apperror/appError";
import { UserSchema } from "@/internal/models/user";
import {
   CreateOrderRequest,
   ListOrderRequest,
   UpdateOrderStatusRequest,
} from "./order.validation";
import mongoose, { HydratedDocument } from "mongoose";
import { OrderSchema } from "@/internal/models/order";

export interface CreateOrderInput {
   customerName: string;
   customerEmail: string;
   items: {
      productId: string;
      quantity: number;
   }[];
   userId?: string;
}

export const listOrdersService = async (
   user: HydratedDocument<UserSchema>,
   query: ListOrderRequest
) => {
   if (user.role === "admin") {
      return await findAllOrders(query);
   }
   if (user.role === "seller") {
      return await findOrdersBySeller(user.id, query);
   }
   return await findOrdersByUser(user.id, query);
};

export const getOrderByIdService = async (
   id: string,
   user: HydratedDocument<UserSchema>
) => {
   const order = await findOrderById(id);
   if (!order) {
      throw NewNotFoundError("Order not found");
   }

   // Check if user has access to this order
   if (
      user.role === "buyer" &&
      order.userId?.toString() !== user._id.toString()
   ) {
      throw NewNotFoundError("Order not found");
   }
   if (user.role === "seller") {
      const isSellerOfAnyItem = order.items.some(
         (item: any) =>
            item.productId?.sellerId?.toString() === user._id.toString()
      );
      if (!isSellerOfAnyItem) {
         throw NewNotFoundError("Order not found");
      }
   }

   return order;
};

export const createOrderService = async (
   user: HydratedDocument<UserSchema>,
   data: CreateOrderRequest
) => {
   const { items, customerName, customerEmail } = data;
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
      await updateProduct(product._id.toString(), { stock: product.stock - item.quantity });
   }

   const orderData: Partial<OrderSchema> = {
      userId: new mongoose.Types.ObjectId(user.id),
      customerName,
      customerEmail,
      items: orderItems,
      totalAmount,
      status: "pending",
   };

   return await createOrder(orderData);
};

export const updateOrderService = async (
   id: string,
   data: UpdateOrderStatusRequest
) => {
   const order = await findOrderById(id);
   if (!order) {
      throw NewNotFoundError("Order not found");
   }
   return await updateOrder(id, data);
};

export const deleteOrderService = async (id: string) => {
   const order = await findOrderById(id);
   if (!order) {
      throw NewNotFoundError("Order not found");
   }
   return await updateOrder(id, { status: "cancelled" });
};
