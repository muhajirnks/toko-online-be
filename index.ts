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

app.use(globalErrorHandler());

// cors
app.use(cors());

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

// FrontEnd / Static
app.use(express.static(path.join(__dirname, "./public")));

connection.on("open", () => {
   app.listen(port, () => {
      console.log(`Server running on [http://localhost:${port}]...`);
   });
});
