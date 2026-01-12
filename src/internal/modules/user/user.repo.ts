import User, { UserSchema } from "@/internal/models/user";

export const findAllUsers = async () => {
   return await User.find().select("-password").exec();
};

export const findUserById = async (id: string) => {
   return await User.findById(id).select("-password").exec();
};

export const updateUser = async (id: string, data: Partial<UserSchema>) => {
   return await User.findByIdAndUpdate(id, data, { new: true }).select("-password").exec();
};

export const deleteUser = async (id: string) => {
   return await User.findByIdAndDelete(id).exec();
};
