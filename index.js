"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)({ path: ".env" });
const database_1 = require("./src/internal/config/database");
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const v1_1 = __importDefault(require("./src/internal/routes/v1"));
const globalError_1 = __importDefault(require("./src/internal/middleware/globalError"));
const bootstrap = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 1. Database & External Services
        yield (0, database_1.connectDB)();
        const app = (0, express_1.default)();
        const port = process.env.PORT || 3001;
        // 2. Middlewares
        const allowedOrigins = [
            "http://localhost:5173",
            "http://localhost:80",
            "http://localhost",
        ];
        app.use((0, cors_1.default)({
            credentials: true,
            origin: (origin, callback) => {
                if (!origin || allowedOrigins.includes(origin)) {
                    callback(null, origin);
                }
                else {
                    callback(new Error("Not allowed by CORS"));
                }
            },
        }));
        app.use((0, compression_1.default)());
        app.use(express_1.default.json());
        app.use(express_1.default.urlencoded({ extended: true }));
        app.use((0, cookie_parser_1.default)());
        app.use((0, morgan_1.default)("tiny"));
        // 3. Routes
        app.use("/api/v1", (0, v1_1.default)());
        // 4. FrontEnd / Static
        app.use(express_1.default.static(path_1.default.join(__dirname, "./public")));
        app.get("*", (req, res) => {
            res.sendFile(path_1.default.join(__dirname, "./public/index.html"));
        });
        // 5. Global Error Handler
        app.use(globalError_1.default);
        // 5. Start Server
        app.listen(port, () => {
            console.log(`Server running on [http://localhost:${port}]...`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
});
bootstrap();
