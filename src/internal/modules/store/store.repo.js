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
exports.updateStore = exports.createStore = exports.findStoreById = exports.findStoreByUserId = void 0;
const store_1 = __importDefault(require("../../../internal/models/store"));
const findStoreByUserId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    return yield store_1.default.findOne({ userId }).lean().exec();
});
exports.findStoreByUserId = findStoreByUserId;
const findStoreById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield store_1.default.findById(id).lean().exec();
});
exports.findStoreById = findStoreById;
const createStore = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield store_1.default.create(data);
    return doc.toObject();
});
exports.createStore = createStore;
const updateStore = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield store_1.default.findByIdAndUpdate(id, data, { new: true }).lean().exec();
});
exports.updateStore = updateStore;
