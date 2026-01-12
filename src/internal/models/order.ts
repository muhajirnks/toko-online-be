import mongoose, { Schema } from "mongoose";
import { ProductSchema } from "./product";

export interface OrderItemSchema {
   product: mongoose.Types.ObjectId | ProductSchema;
   name: string;
   quantity: number;
   price: number;
}

export interface OrderSchema {
   userId?: mongoose.Types.ObjectId;
   customerName: string;
   customerEmail: string;
   items: OrderItemSchema[];
   totalAmount: number;
   status: "pending" | "paid" | "shipped" | "completed" | "cancelled";
   createdAt: Date;
   updatedAt: Date;
}

const OrderSchema: Schema = new Schema(
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

export default mongoose.model<OrderSchema>("Order", OrderSchema);
