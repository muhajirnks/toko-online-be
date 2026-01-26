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
const bcrypt_1 = __importDefault(require("bcrypt"));
const appError_1 = require("../../../pkg/apperror/appError");
const token_1 = require("../../../pkg/auth/token");
const store_repo_1 = require("../store/store.repo");
const user_repo_1 = require("../user/user.repo");
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
    const store = yield (0, store_repo_1.findStoreByUserId)(user._id.toString());
    delete user.password;
    return {
        token,
        data: Object.assign(Object.assign({}, user), { store: store || null }),
    };
});
exports.loginService = loginService;
const refreshService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const storedToken = yield (0, auth_repo_1.findToken)(token);
    if (!storedToken) {
        throw (0, appError_1.NewBadRequestError)("Invalid refresh token");
    }
    const user = yield (0, user_repo_1.findUserById)(storedToken.userId.toString());
    if (!user) {
        throw (0, appError_1.NewBadRequestError)("User not found");
    }
    const refToken = yield (0, auth_repo_1.createToken)(user._id.toString(), (0, token_1.generateRefreshToken)());
    // Generate JWT Token
    const userToken = (0, token_1.generateUserToken)(refToken);
    yield (0, auth_repo_1.deleteToken)(token);
    return {
        token: userToken,
    };
});
exports.refreshService = refreshService;
const logoutService = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return (0, auth_repo_1.deleteToken)(token);
});
exports.logoutService = logoutService;
