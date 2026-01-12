import mongoose, { Schema } from "mongoose";

export interface CategorySchema {
   name: string;
   description?: string;
   createdAt: Date;
   updatedAt: Date;
}

const CategorySchema: Schema = new Schema(
   {
      name: { type: String, required: true, unique: true },
      description: { type: String },
   },
   {
      timestamps: true,
      versionKey: false,
   }
);

export default mongoose.model<CategorySchema>("Category", CategorySchema);
