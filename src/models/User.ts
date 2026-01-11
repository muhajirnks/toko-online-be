import { Schema, model } from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt";

export interface UserSchema {
   name?: string;
   email?: string;
   password?: string;
   updatedAt?: NativeDate;
   createdAt?: NativeDate;
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
         validate: [validator.isEmail, "Invalid email"],
      },
      password: {
         type: String,
         required: true,
         minLength: 8,
         trim: true,
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
