import { deleteUser, findAllUsers, findUserById, updateUser } from "./user.repo";
import { NewNotFoundError } from "@/pkg/apperror/appError";
import { UserSchema } from "@/internal/models/user";

export const getAllUsersService = async () => {
   return await findAllUsers();
};

export const getUserByIdService = async (id: string) => {
   const user = await findUserById(id);
   if (!user) {
      throw NewNotFoundError("User not found");
   }
   return user;
};

export const updateUserService = async (id: string, data: Partial<UserSchema>) => {
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
