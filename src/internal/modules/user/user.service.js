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
exports.deleteUserService = exports.updateUserService = exports.getUserByIdService = exports.listUsersService = void 0;
const user_repo_1 = require("./user.repo");
const appError_1 = require("../../../pkg/apperror/appError");
const listUsersService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, user_repo_1.findAllUsers)(query);
});
exports.listUsersService = listUsersService;
const getUserByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_repo_1.findUserById)(id);
    if (!user) {
        throw (0, appError_1.NewNotFoundError)("User not found");
    }
    return user;
});
exports.getUserByIdService = getUserByIdService;
const updateUserService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_repo_1.findUserById)(id);
    if (!user) {
        throw (0, appError_1.NewNotFoundError)("User not found");
    }
    return yield (0, user_repo_1.updateUser)(id, data);
});
exports.updateUserService = updateUserService;
const deleteUserService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_repo_1.findUserById)(id);
    if (!user) {
        throw (0, appError_1.NewNotFoundError)("User not found");
    }
    return yield (0, user_repo_1.deleteUser)(id);
});
exports.deleteUserService = deleteUserService;
