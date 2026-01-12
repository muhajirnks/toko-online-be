import mongoose from "mongoose";

export const connectDB = () => {
   mongoose.connect(`mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin`);

   mongoose.connection.on("open", async () => {
      console.log("Database Connected");
   });

   return mongoose.connection;
};
