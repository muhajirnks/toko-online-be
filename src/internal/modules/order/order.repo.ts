import Order, { OrderSchema } from "@/internal/models/order";
import Product from "@/internal/models/product";
import { ListBuyerOrderRequest, ListSellerOrderRequest } from "./order.validation";
import { QueryFilter } from "mongoose";

export const findOrdersByStore = async (storeId: string, query: ListSellerOrderRequest) => {
   const products = await Product.find({ store: storeId }, "_id").lean();
   const productIds = products.map((p) => p._id);

   const filter: QueryFilter<OrderSchema> = {
      "items.product": { $in: productIds },
   };

   if (query.status) {
      filter.status = query.status;
   }

   if (query.userId) {
      filter.userId = query.userId;
   }

   if (query.search) {
      filter.$or = [
         // { _id: { $regex: query.search, $options: "i" } },
         { customerName: { $regex: query.search, $options: "i" } },
         { customerEmail: { $regex: query.search, $options: "i" } },
         { "items.name": { $regex: query.search, $options: "i" } },
      ];
   }

   return await Order.paginate(filter, {
      page: query.page,
      limit: query.limit,
      sort: [
         [query.sort, query.direction],
         ["_id", "desc"],
      ],
      lean: true,
      populate: {
         path: "items.product",
      },
   });
};

export const findOrdersByUser = async (userId: string, query: ListBuyerOrderRequest) => {
   const filter: QueryFilter<OrderSchema> = { userId };

   if (query.status) {
      filter.status = query.status;
   }

   if (query.storeId) {
      const products = await Product.find({ store: query.storeId }, "_id").lean();
      const productIds = products.map((p) => p._id);
      filter["items.product"] = { $in: productIds };
   }

   if (query.search) {
      filter.$or = [
         // { _id: { $regex: query.search, $options: "i" } },
         { customerName: { $regex: query.search, $options: "i" } },
         { customerEmail: { $regex: query.search, $options: "i" } },
         { "items.name": { $regex: query.search, $options: "i" } },
      ];
   }

   return await Order.paginate(filter, {
      page: query.page,
      limit: query.limit,
      sort: [
         [query.sort, query.direction],
         ["_id", "desc"],
      ],
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
