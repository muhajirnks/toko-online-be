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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutHandler = exports.getProfileHandler = exports.refreshHandler = exports.loginHandler = exports.registerHandler = void 0;
const success_1 = require("../../../pkg/response/success");
const auth_service_1 = require("./auth.service");
const auth_validation_1 = require("./auth.validation");
const registerHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield auth_validation_1.registerSchema.validate(req.body);
    const user = yield (0, auth_service_1.registerService)(body);
    delete user.password;
    (0, success_1.createdResponse)(res, {
        data: user,
        message: "User registered successfully",
    });
});
exports.registerHandler = registerHandler;
const loginHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = yield auth_validation_1.loginSchema.validate(req.body);
    const { token, data } = yield (0, auth_service_1.loginService)(email, password);
    (0, success_1.tokenResponse)(res, {
        data,
        token,
        message: "Login success",
    });
});
exports.loginHandler = loginHandler;
const refreshHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refresh_token } = yield auth_validation_1.refreshSchema.validate({ refresh_token: req.cookies.refresh_token });
    const { token, data } = yield (0, auth_service_1.refreshService)(refresh_token);
    (0, success_1.tokenResponse)(res, {
        data,
        token,
        message: "Refresh token success",
    });
});
exports.refreshHandler = refreshHandler;
const getProfileHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    (0, success_1.successResponse)(res, {
        data: (_a = req.user) === null || _a === void 0 ? void 0 : _a.toObject(),
    });
});
exports.getProfileHandler = getProfileHandler;
const logoutHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { refresh_token } = yield auth_validation_1.logoutSchema.validate({ refresh_token: req.cookies.refresh_token });
    yield (0, auth_service_1.logoutService)(refresh_token);
    // Clear Cookie
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    res.clearCookie("refresh_token", {
        httpOnly: true,
        secure: true,
        sameSite: "none",
    });
    (0, success_1.successResponse)(res, {
        message: "Logout success",
    });
});
exports.logoutHandler = logoutHandler;
