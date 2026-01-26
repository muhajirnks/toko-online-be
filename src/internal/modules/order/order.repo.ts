import Order, { OrderSchema } from "@/internal/models/order";
import { ListOrderRequest } from "./order.validation";

export const findAllOrders = async (query: ListOrderRequest) => {
   return await Order.paginate({}, {
      page: query.page,
      limit: query.limit,
      sort: [[query.sort, query.direction], ["_id", "desc"]],
      lean: true,
      populate: ["items.product"],
   })
};

export const findOrdersByStore = async (storeId: string, query: ListOrderRequest) => {
   return await Order.paginate({}, {
      page: query.page,
      limit: query.limit,
      sort: [[query.sort, query.direction], ["_id", "desc"]],
      lean: true,
      populate: {
         path: "items.product",
         match: { store: storeId },
      }
   })
};

export const findOrdersByUser = async (userId: string, query: ListOrderRequest) => {
   return await Order.paginate({ userId }, {
      page: query.page,
      limit: query.limit,
      sort: [[query.sort, query.direction], ["_id", "desc"]],
      lean: true,
      populate: ["items.product"],
   });
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
