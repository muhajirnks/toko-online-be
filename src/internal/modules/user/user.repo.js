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
exports.deleteUser = exports.updateUser = exports.findUserById = exports.findAllUsers = void 0;
const user_1 = __importDefault(require("../../../internal/models/user"));
const findAllUsers = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.paginate({}, {
        page: query.page,
        limit: query.limit,
        sort: [[query.sort, query.direction], ["_id", "desc"]],
        lean: true,
        select: '-password',
    });
});
exports.findAllUsers = findAllUsers;
const findUserById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findById(id).select("-password").lean().exec();
});
exports.findUserById = findUserById;
const updateUser = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findByIdAndUpdate(id, data, { new: true }).select("-password").exec();
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findByIdAndDelete(id).exec();
});
exports.deleteUser = deleteUser;
