import User from "@/models/User";

export const findByEmail = async (email: string) => {
   return await User.findOne({ email });
};
