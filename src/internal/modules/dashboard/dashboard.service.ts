import { getAdminStats, getSellerStats } from "./dashboard.repo";
import { findStoreByUserId } from "../store/store.repo";
import { UserSchema } from "@/internal/models/user";

export const getAdminDashboardService = async () => {
   return await getAdminStats();
};

export const getSellerDashboardService = async (user: UserSchema) => {
   const store = await findStoreByUserId(user._id.toString());
   if (!store) {
      throw new Error("Store not found for this user");
   }
   return await getSellerStats(store._id.toString());
};
