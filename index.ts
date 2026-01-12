import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import compression from "compression";
import cors from "cors";
import { config } from "dotenv";
config({ path: ".env" });

import path from "path";
import initV1Route from "@/internal/routes/v1";
import globalErrorHandler from "@/internal/middleware/globalError";
import { initMinio } from "@/pkg/minio/minio";
import { connectDB } from "@/internal/config/database";

const connection = connectDB();
initMinio();

const app = express();
const port = process.env.PORT || 3001;

// cors
const allowedOrigins = ['http://localhost:5173', 'http://localhost:80', 'http://localhost'];
app.use(cors({
   credentials: true,
   origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
         callback(null, origin);
      } else {
         callback(new Error('Not allowed by CORS'));
      }
   }
}));

// gzip
app.use(compression());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Log
app.use(morgan("tiny"));

// api v1
app.use("/api/v1", initV1Route());

// Static
app.use(express.static(path.join(__dirname, "./public")));

// Global Error Handler
app.use(globalErrorHandler);

connection.on("open", () => {
   app.listen(port, () => {
      console.log(`Server running on [http://localhost:${port}]...`);
   });
});
