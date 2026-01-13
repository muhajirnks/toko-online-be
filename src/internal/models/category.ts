import { PaginateModel } from "@/pkg/pagination/mongoosePlugin";
import mongoose, { Schema, Types } from "mongoose";

export interface CategorySchema {
   _id: Types.ObjectId;
   name: string;
   description?: string;
   createdAt: Date;
   updatedAt: Date;
}

const categorySchema = new Schema<CategorySchema>(
   {
      name: { type: String, required: true, unique: true },
      description: { type: String },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);

export default mongoose.model<CategorySchema, PaginateModel<CategorySchema>>("Category", categorySchema);
