"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateUserToken = exports.generateRefreshToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateRefreshToken = () => {
    const bytes = crypto_1.default.randomBytes(40);
    return base64UrlEncode(bytes);
};
exports.generateRefreshToken = generateRefreshToken;
const generateUserToken = (token) => {
    const accessToken = jsonwebtoken_1.default.sign({ type: "access", sub: token._id.toString() }, process.env.JWT_KEY, {
        expiresIn: "1h",
    });
    return {
        type: 'Bearer',
        accessToken,
        refreshToken: token.refreshToken,
    };
};
exports.generateUserToken = generateUserToken;
const base64UrlEncode = (buffer) => {
    return buffer
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/g, "");
};
