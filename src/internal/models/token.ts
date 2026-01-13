import { Schema, Types, model } from "mongoose";

export interface TokenSchema {
   _id: Types.ObjectId;
   userId: Schema.Types.ObjectId | string;
   refreshToken: string;
   lastUsed: NativeDate;
   updatedAt: NativeDate;
   createdAt: NativeDate;
}

const tokenSchema = new Schema<TokenSchema>(
   {
      userId: {
         type: Schema.Types.ObjectId,
         ref: "User",
         required: true,
      },
      refreshToken: {
         type: String,
         required: true,
         unique: true,
      },
      lastUsed: {
         type: Date,
         required: true,
      },
   },
   { timestamps: true, versionKey: false }
);

const Token = model("Token", tokenSchema);

export default Token;
