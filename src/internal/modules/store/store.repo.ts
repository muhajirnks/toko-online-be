import Store, { StoreSchema } from "@/internal/models/store";

export const findStoreByUserId = async (userId: string) => {
   return await Store.findOne({ userId }).lean().exec();
};

export const findStoreById = async (id: string) => {
   return await Store.findById(id).lean().exec();
};

export const createStore = async (data: Partial<StoreSchema>) => {
   const doc = await Store.create(data);
   return doc.toObject();
};

export const updateStore = async (id: string, data: Partial<StoreSchema>) => {
   return await Store.findByIdAndUpdate(id, data, { new: true }).lean().exec();
};
