import { Schema, Types, model } from "mongoose";
import { PaginateModel } from "@/pkg/pagination/mongoosePlugin";

export interface StoreSchema {
   _id: Types.ObjectId;
   user: Types.ObjectId;
   name: string;
   description: string | null;
   avatarUrl: string | null;
   updatedAt: NativeDate;
   createdAt: NativeDate;
}

const storeSchema = new Schema<StoreSchema>(
   {
      name: {
         type: String,
         required: true,
      },
      description: {
         type: String,
         required: false,
      },
      avatarUrl: {
         type: String,
         required: false,
      },
      user: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
   },
   { timestamps: true, versionKey: false },
);

const Store = model<StoreSchema, PaginateModel<StoreSchema>>(
   "Store",
   storeSchema,
);

export default Store;
