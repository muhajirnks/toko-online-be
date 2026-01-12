import mongoose, { Schema } from "mongoose";

export interface ProductSchema {
   name: string;
   description: string;
   price: number;
   stock: number;
   imageUrl: string;
   category?: mongoose.Types.ObjectId;
   seller: mongoose.Types.ObjectId;
   createdAt: Date;
   updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
   {
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true, default: 0 },
      imageUrl: { type: String, required: true },
      category: { type: Schema.Types.ObjectId, ref: "Category" },
      seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);

export default mongoose.model<ProductSchema>("Product", ProductSchema);
