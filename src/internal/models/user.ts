import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

export interface UserSchema {
   name: string;
   email: string;
   password?: string;
   role: "admin" | "seller" | "buyer";
   updatedAt: NativeDate;
   createdAt: NativeDate;
}

const userSchema = new Schema<UserSchema>(
   {
      name: {
         type: String,
         required: true,
      },
      email: {
         type: String,
         required: true,
         unique: true,
         trim: true,
         lowercase: true,
      },
      password: {
         type: String,
         required: true,
         minLength: 8,
         trim: true,
      },
      role: {
         type: String,
         enum: ["admin", "seller", "buyer"],
         default: "buyer",
      },
   },
   { timestamps: true, versionKey: false }
);

userSchema.pre("save", async function () {
   const salt = await bcrypt.genSalt(10);

   if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password!, salt);
   }
});

const User = model("User", userSchema);

export default User;
