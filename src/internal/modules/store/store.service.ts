import {
   createStore,
   findStoreByUserId,
   updateStore,
} from "./store.repo";
import { NewBadRequestError, NewNotFoundError } from "@/pkg/apperror/appError";
import { CreateStoreRequest, UpdateStoreRequest } from "./store.validation";
import { StoreSchema } from "@/internal/models/store";
import mongoose from "mongoose";

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

   const store: Partial<StoreSchema> = {
      name: data.name,
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

   return await updateStore(store._id.toString(), { name: data.name });
};
