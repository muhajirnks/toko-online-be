import mongoose, { Schema, Document } from "mongoose";

export interface ProductSchema extends Document {
   name: string;
   description: string;
   price: number;
   stock: number;
   image?: string;
   category?: string;
   createdAt: Date;
   updatedAt: Date;
}

const ProductSchema: Schema = new Schema(
   {
      name: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      stock: { type: Number, required: true, default: 0 },
      image: { type: String },
      category: { type: String },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);

export default mongoose.model<ProductSchema>("Product", ProductSchema);
