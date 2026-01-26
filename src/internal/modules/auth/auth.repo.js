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
exports.createToken = exports.deleteToken = exports.findToken = exports.createUser = exports.findByEmail = void 0;
const token_1 = __importDefault(require("../../../internal/models/token"));
const user_1 = __importDefault(require("../../../internal/models/user"));
const findByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    return yield user_1.default.findOne({ email }).lean().exec();
});
exports.findByEmail = findByEmail;
const createUser = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_1.default.create(data);
    return result.toObject();
});
exports.createUser = createUser;
const findToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield token_1.default.findOne({ refreshToken: token }).lean().exec();
});
exports.findToken = findToken;
const deleteToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    return yield token_1.default.deleteOne({ refreshToken: token }).exec();
});
exports.deleteToken = deleteToken;
const createToken = (userId, refreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield token_1.default.create({
        userId,
        refreshToken,
        lastUsed: new Date(),
    });
    return result.toObject();
});
exports.createToken = createToken;
