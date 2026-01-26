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
exports.deleteUserHandler = exports.updateUserHandler = exports.getUserByIdHandler = exports.listUsersHandler = void 0;
const user_service_1 = require("./user.service");
const success_1 = require("../../../pkg/response/success");
const user_validation_1 = require("./user.validation");
const listUsersHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield user_validation_1.listUserSchema.validate(req.query);
    const data = yield (0, user_service_1.listUsersService)(query);
    (0, success_1.paginationResponse)(res, data);
});
exports.listUsersHandler = listUsersHandler;
const getUserByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield (0, user_service_1.getUserByIdService)(id);
    (0, success_1.successResponse)(res, { data });
});
exports.getUserByIdHandler = getUserByIdHandler;
const updateUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = yield user_validation_1.updateUserSchema.validate(req.body);
    const data = yield (0, user_service_1.updateUserService)(id, body);
    (0, success_1.successResponse)(res, { data, message: "User updated successfully" });
});
exports.updateUserHandler = updateUserHandler;
const deleteUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield (0, user_service_1.deleteUserService)(id);
    (0, success_1.successResponse)(res, { message: "User deleted successfully" });
});
exports.deleteUserHandler = deleteUserHandler;
