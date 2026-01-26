import {
   createStore,
   findStoreByUserId,
   updateStore,
} from "./store.repo";
import { NewBadRequestError, NewNotFoundError } from "@/pkg/apperror/appError";
import { CreateStoreRequest, UpdateStoreRequest } from "./store.validation";
import { StoreSchema } from "@/internal/models/store";
import mongoose from "mongoose";
import { uploadFile } from "@/pkg/cloudinary/cloudinary";

export const getMyStoreService = async (userId: string) => {
   const store = await findStoreByUserId(userId);
   if (!store) {
      throw NewNotFoundError("Store not found");
   }
   return store;
};

export const createMyStoreService = async (
   userId: string,
   data: CreateStoreRequest
) => {
   const existingStore = await findStoreByUserId(userId);
   if (existingStore) {
      throw NewBadRequestError("User already has a store");
   }

   let avatarUrl = null;
   if (data.avatar) {
      const upload = await uploadFile(data.avatar, "stores");
      avatarUrl = upload.publicPath;
   }

   const store: Partial<StoreSchema> = {
      name: data.name,
      description: data.description || null,
      avatarUrl: avatarUrl,
      user: new mongoose.Types.ObjectId(userId),
   };

   return await createStore(store);
};

export const updateMyStoreService = async (
   userId: string,
   data: UpdateStoreRequest
) => {
   const store = await findStoreByUserId(userId);
   if (!store) {
      throw NewNotFoundError("Store not found");
   }

   const updatedData: Partial<StoreSchema> = {
      name: data.name,
      description: data.description || null,
   };

   if (data.avatar) {
      const upload = await uploadFile(data.avatar, "stores");
      updatedData.avatarUrl = upload.publicPath;
   }

   return await updateStore(store._id.toString(), updatedData);
};
