import Order, { OrderSchema } from "@/internal/models/order";
import { ListOrderRequest } from "./order.validation";

export const findAllOrders = async (query: ListOrderRequest) => {
   return await Order.find().populate("items.product").lean().exec();
};

export const findOrdersBySeller = async (sellerId: string, query: ListOrderRequest) => {
   return await Order.find().populate({
      path: "items.product",
      match: { sellerId: sellerId }
   }).lean().exec().then(orders => orders.filter(order => order.items.some(item => item.product !== null)));
};

export const findOrdersByUser = async (userId: string, query: ListOrderRequest) => {
   return await Order.find({ userId }).lean().exec();
};

export const findOrderById = async (id: string) => {
   return await Order.findById(id).populate("items.product").exec();
};

export const createOrder = async (data: Partial<OrderSchema>) => {
   const result = await Order.create(data);
   return result.toObject();
};

export const updateOrder = async (id: string, data: Partial<OrderSchema>) => {
   return await Order.findByIdAndUpdate(id, data, { new: true }).exec();
};
