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
exports.updateMyStoreService = exports.createMyStoreService = exports.getMyStoreService = void 0;
const store_repo_1 = require("./store.repo");
const appError_1 = require("../../../pkg/apperror/appError");
const mongoose_1 = __importDefault(require("mongoose"));
const cloudinary_1 = require("../../../pkg/cloudinary/cloudinary");
const getMyStoreService = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const store = yield (0, store_repo_1.findStoreByUserId)(userId);
    if (!store) {
        throw (0, appError_1.NewNotFoundError)("Store not found");
    }
    return store;
});
exports.getMyStoreService = getMyStoreService;
const createMyStoreService = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const existingStore = yield (0, store_repo_1.findStoreByUserId)(userId);
    if (existingStore) {
        throw (0, appError_1.NewBadRequestError)("User already has a store");
    }
    let avatarUrl = null;
    if (data.avatar) {
        const upload = yield (0, cloudinary_1.uploadFile)(data.avatar, "stores");
        avatarUrl = upload.publicPath;
    }
    const store = {
        name: data.name,
        description: data.description || null,
        avatarUrl: avatarUrl,
        user: new mongoose_1.default.Types.ObjectId(userId),
    };
    return yield (0, store_repo_1.createStore)(store);
});
exports.createMyStoreService = createMyStoreService;
const updateMyStoreService = (userId, data) => __awaiter(void 0, void 0, void 0, function* () {
    const store = yield (0, store_repo_1.findStoreByUserId)(userId);
    if (!store) {
        throw (0, appError_1.NewNotFoundError)("Store not found");
    }
    const updatedData = {
        name: data.name,
        description: data.description || null,
    };
    if (data.avatar) {
        const upload = yield (0, cloudinary_1.uploadFile)(data.avatar, "stores");
        updatedData.avatarUrl = upload.publicPath;
    }
    return yield (0, store_repo_1.updateStore)(store._id.toString(), updatedData);
});
exports.updateMyStoreService = updateMyStoreService;
