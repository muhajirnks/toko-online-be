import paginationPlugin from "@/pkg/pagination/mongoosePlugin";
import mongoose from "mongoose";

// Apply the plugin globally to all schemas
mongoose.plugin(paginationPlugin);

export const connectDB = async () => {
   await mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`);
   console.log("Database Connected");
};
