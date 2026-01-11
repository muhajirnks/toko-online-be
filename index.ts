import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import mongoose from "mongoose";
import compression from "compression";
import cors from 'cors';
import { config } from "dotenv";
config({ path: ".env" });

import path from "path";
import "@/internal/config/cloudinary";
import initV1Route from "@/internal/routes/v1";
import globalErrorHandler from "@/internal/middleware/globalError";

const app = express();
const port = process.env.PORT || 3001;

app.use(globalErrorHandler());

// cors
app.use(cors())

// gzip
app.use(compression());

// Parser
app.use(express.json());
app.use(cookieParser());

// Log
app.use(morgan("tiny"));

// api v1
app.use("/api/v1", initV1Route());

// FrontEnd / Static
app.use(express.static(path.join(__dirname, "./public")));
app.get("*", (req, res) => {
   res.sendFile(path.join(__dirname, "./public/index.html"));
});


// MongoDB Connect
mongoose.connect(process.env.MONGO_URI!);

mongoose.connection.on("open", () => {
   console.log("Database Connected");
   app.listen(port, () => {
      console.log(`Server running on [http://localhost:${port}]...`);
   });
});
