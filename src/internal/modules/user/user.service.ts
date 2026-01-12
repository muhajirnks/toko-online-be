import { deleteUser, findAllUsers, findUserById, updateUser } from "./user.repo";
import { NewNotFoundError } from "@/pkg/apperror/appError";
import { ListUserRequest, UpdateUserRequest } from "./user.validation";

export const listUsersService = async (query: ListUserRequest) => {
   return await findAllUsers(query);
};

export const getUserByIdService = async (id: string) => {
   const user = await findUserById(id);
   if (!user) {
      throw NewNotFoundError("User not found");
   }
   return user;
};

export const updateUserService = async (id: string, data: UpdateUserRequest) => {
   const user = await findUserById(id);
   if (!user) {
      throw NewNotFoundError("User not found");
   }
   return await updateUser(id, data);
};

export const deleteUserService = async (id: string) => {
   const user = await findUserById(id);
   if (!user) {
      throw NewNotFoundError("User not found");
   }
   return await deleteUser(id);
};
