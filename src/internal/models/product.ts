import { PaginateModel } from "@/pkg/pagination/mongoosePlugin";
import { model, Schema, Types } from "mongoose";

export interface ProductSchema {
   _id: Types.ObjectId;
   name: string;
   description: string;
   price: number;
   stock: number;
   imageUrl: string;
   category?: Types.ObjectId;
   store: Types.ObjectId;
   createdAt: Date;
   updatedAt: Date;
}

const productSchema = new Schema<ProductSchema>(
   {
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true, default: 0 },
      imageUrl: { type: String, required: true },
      category: {
         type: Schema.Types.ObjectId,
         ref: "Category",
         required: true,
      },
      store: { type: Schema.Types.ObjectId, ref: "Store", required: true },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);

const Product = model<ProductSchema, PaginateModel<ProductSchema>>(
   "Product",
   productSchema
);

export default Product;