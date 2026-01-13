import User, { UserSchema } from "@/internal/models/user";
import { ListUserRequest } from "./user.validation";

export const findAllUsers = async (query: ListUserRequest) => {
   return await User.paginate({}, {
      page: query.page,
      limit: query.limit,
      sort: [[query.sort, query.direction], ["_id", "desc"]],
      lean: true,
      select: '-password',
   });
};

export const findUserById = async (id: string) => {
   return await User.findById(id).select("-password").lean().exec();
};

export const updateUser = async (id: string, data: Partial<UserSchema>) => {
   return await User.findByIdAndUpdate(id, data, { new: true }).select("-password").exec();
};

export const deleteUser = async (id: string) => {
   return await User.findByIdAndDelete(id).exec();
};
