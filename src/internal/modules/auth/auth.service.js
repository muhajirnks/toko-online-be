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
exports.logoutService = exports.refreshService = exports.loginService = exports.registerService = void 0;
const auth_repo_1 = require("./auth.repo");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const appError_1 = require("../../../pkg/apperror/appError");
const token_1 = require("../../../pkg/auth/token");
const registerService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const existUser = yield (0, auth_repo_1.findByEmail)(data.email);
    if (existUser) {
        throw (0, appError_1.NewConflictError)("Email already exist");
    }
    const user = yield (0, auth_repo_1.createUser)(data);
    return user;
});
exports.registerService = registerService;
const loginService = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, auth_repo_1.findByEmail)(email);
    if (!user) {
        throw (0, appError_1.NewBadRequestError)("Bad Credential");
    }
    // Check Password
    const checkPassword = yield bcrypt_1.default.compare(password, user.password);
    if (!checkPassword) {
        throw (0, appError_1.NewBadRequestError)("Bad Credential");
    }
    // Store Refresh Token
    const refToken = yield (0, auth_repo_1.createToken)(user._id.toString(), (0, token_1.generateRefreshToken)());
    // Generate JWT Token
    const token = (0, token_1.generateUserToken)(refToken);
    delete user.password;
    return {
        token,
        data: user,
    };
});
exports.loginService = loginService;
const refreshService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const storedToken = yield (0, auth_repo_1.findToken)(token);
    if (!storedToken) {
        throw (0, appError_1.NewBadRequestError)("Invalid refresh token");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_REFRESH_KEY);
        const user = yield (0, auth_repo_1.findByEmail)(decoded.email);
        if (!user) {
            throw (0, appError_1.NewBadRequestError)("User not found");
        }
        const accessToken = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_KEY, {
            expiresIn: "1h",
        });
        const refreshToken = jsonwebtoken_1.default.sign({ email: user.email }, process.env.JWT_REFRESH_KEY, {
            expiresIn: "7d",
        });
        // Update Refresh Token (Optional: rotate token)
        yield (0, auth_repo_1.deleteToken)(token);
        yield (0, auth_repo_1.createToken)(user._id.toString(), refreshToken);
        delete user.password;
        return {
            token: {
                type: "Bearer",
                accessToken,
                refreshToken,
            },
            data: user,
        };
    }
    catch (error) {
        throw (0, appError_1.NewBadRequestError)("Invalid or expired refresh token");
    }
});
exports.refreshService = refreshService;
const logoutService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, auth_repo_1.deleteToken)(token);
});
exports.logoutService = logoutService;
