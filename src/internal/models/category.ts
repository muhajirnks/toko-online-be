import mongoose, { Schema, Document } from "mongoose";

export interface CategorySchema extends Document {
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
