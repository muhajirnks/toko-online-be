import mongoose, { Schema, Types } from "mongoose";
import { ProductSchema } from "./product";
import { PaginateModel } from "@/pkg/pagination/mongoosePlugin";

export interface OrderItemSchema {
   _id: Types.ObjectId;
   product: mongoose.Types.ObjectId | ProductSchema;
   name: string;
   quantity: number;
   price: number;
}

export interface OrderSchema {
   _id: Types.ObjectId;
   userId?: mongoose.Types.ObjectId;
   customerName: string;
   customerEmail: string;
   items: OrderItemSchema[];
   totalAmount: number;
   status: "pending" | "paid" | "shipped" | "completed" | "cancelled";
   createdAt: Date;
   updatedAt: Date;
}

const orderSchema = new Schema<OrderSchema>(
   {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      customerName: { type: String, required: true },
      customerEmail: { type: String, required: true },
      items: [
         {
            product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true, min: 1 },
            price: { type: Number, required: true, min: 0 },
         },
      ],
      totalAmount: { type: Number, required: true, min: 0 },
      status: {
         type: String,
         enum: ["pending", "paid", "shipped", "completed", "cancelled"],
         default: "pending",
      },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);

export default mongoose.model<OrderSchema, PaginateModel<OrderSchema>>("Order", orderSchema);
