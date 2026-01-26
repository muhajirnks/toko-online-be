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
exports.authorize = exports.verifyToken = void 0;
const user_1 = __importDefault(require("../../internal/models/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_1 = __importDefault(require("../models/token"));
const authMiddleware = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.access_token;
    if (token) {
        try {
            const user = yield (0, exports.verifyToken)(token);
            req.user = user;
            next();
        }
        catch (err) {
            res.status(401).json({ message: err.message });
        }
    }
    else {
        res.status(401).json({ message: "Unauthorized" });
    }
});
const verifyToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_KEY);
        const tokenDoc = yield token_1.default.findById(decoded.sub);
        const user = yield user_1.default.findById(tokenDoc === null || tokenDoc === void 0 ? void 0 : tokenDoc.userId).select("-password");
        return user;
    }
    catch (_a) {
        throw new Error("Unauthorized");
    }
});
exports.verifyToken = verifyToken;
const authorize = (roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: "Forbidden: Access denied" });
        }
        next();
    };
};
exports.authorize = authorize;
exports.default = authMiddleware;
