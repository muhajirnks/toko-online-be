import Order, { OrderSchema } from "@/internal/models/order";

export const findAllOrders = async (query: any = {}) => {
   return await Order.find(query).populate("items.productId").exec();
};

export const findOrderById = async (id: string) => {
   return await Order.findById(id).populate("items.productId").exec();
};

export const createOrder = async (data: any) => {
   return await Order.create(data);
};

export const updateOrder = async (id: string, data: any) => {
   return await Order.findByIdAndUpdate(id, data, { new: true }).exec();
};
