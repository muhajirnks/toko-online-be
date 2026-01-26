import {
   createOrder,
   findAllOrders,
   findOrderById,
   findOrdersByStore,
   findOrdersByUser,
   updateOrder,
} from "./order.repo";
import { findProductById, updateProduct } from "../product/product.repo";
import {
   NewBadRequestError,
   NewForbiddenError,
   NewNotFoundError,
} from "@/pkg/apperror/appError";
import { UserSchema } from "@/internal/models/user";
import {
   CreateOrderRequest,
   ListOrderRequest,
   UpdateOrderStatusRequest,
} from "./order.validation";
import mongoose, { HydratedDocument } from "mongoose";
import { OrderSchema } from "@/internal/models/order";
import { findStoreByUserId } from "../store/store.repo";

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
   
   const store = await findStoreByUserId(user.id);
   if (store) {
      return await findOrdersByStore(store._id.toString(), query);
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
      user.role === "user" &&
      order.userId?.toString() === user._id.toString()
   ) {
      return order;
   }
   
   if (user.role === "admin") {
      return order;
   }

   const store = await findStoreByUserId(user.id);
   if (store) {
      const isSellerOfAnyItem = order.items.some((item) => {
         if (typeof item.product === "object" && "store" in item.product) {
            return item.product.store.toString() === store._id.toString();
         }
         return false;
      });

      if (isSellerOfAnyItem) {
         return order;
      }
   }

   throw NewNotFoundError("Order not found");
};

export const createOrderService = async (
   user: HydratedDocument<UserSchema>,
   data: CreateOrderRequest
) => {
   const { items } = data;
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
      await updateProduct(product._id.toString(), {
         stock: product.stock - item.quantity,
      });
   }

   const orderData: Partial<OrderSchema> = {
      userId: new mongoose.Types.ObjectId(user.id),
      customerName: user.name,
      customerEmail: user.email,
      items: orderItems.map((item) => ({ ...item, product: item.productId })) as any,
      totalAmount,
      status: "pending",
   };

   return await createOrder(orderData);
};

export const updateOrderStatusService = async (
   id: string,
   user: HydratedDocument<UserSchema>,
   data: UpdateOrderStatusRequest
) => {
   const order = await findOrderById(id);
   if (!order) {
      throw NewNotFoundError("Order not found");
   }

   if (user.role === "admin") {
      return await updateOrder(id, { status: data.status });
   }

   const store = await findStoreByUserId(user.id);
   if (!store) {
      throw NewForbiddenError("You are not authorized to update this order");
   }

   const isSellerOfAnyItem = order.items.some((item) => {
      if (typeof item.product === "object" && "store" in item.product) {
         return item.product.store.toString() === store._id.toString();
      }
      return false;
   });

   if (!isSellerOfAnyItem) {
      throw NewForbiddenError("You are not authorized to update this order");
   }

   return await updateOrder(id, { status: data.status });
};

export const deleteOrderService = async (id: string) => {
   const order = await findOrderById(id);
   if (!order) {
      throw NewNotFoundError("Order not found");
   }
   return await updateOrder(id, { status: "cancelled" });
};
