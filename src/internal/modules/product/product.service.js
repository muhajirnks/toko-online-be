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
exports.deleteProductService = exports.updateProductService = exports.createProductService = exports.getProductByIdService = exports.listProductsService = void 0;
const product_repo_1 = require("./product.repo");
const appError_1 = require("../../../pkg/apperror/appError");
const cloudinary_1 = require("../../../pkg/cloudinary/cloudinary");
const mongoose_1 = __importDefault(require("mongoose"));
const store_repo_1 = require("../store/store.repo");
const listProductsService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield (0, product_repo_1.findAllProducts)(query);
    return items;
});
exports.listProductsService = listProductsService;
const getProductByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, product_repo_1.findProductById)(id);
    if (!product) {
        throw (0, appError_1.NewNotFoundError)("Product not found");
    }
    return product;
});
exports.getProductByIdService = getProductByIdService;
const createProductService = (data, user) => __awaiter(void 0, void 0, void 0, function* () {
    const store = yield (0, store_repo_1.findStoreByUserId)(user.id);
    if (!store) {
        throw (0, appError_1.NewNotFoundError)("You must have a store to create a product");
    }
    const product = {
        name: data.name,
        category: new mongoose_1.default.Types.ObjectId(data.categoryId),
        description: data.description,
        price: data.price,
        store: store._id,
        stock: data.stock,
    };
    const { publicPath } = yield (0, cloudinary_1.uploadFile)(data.image, "products");
    product.imageUrl = publicPath;
    const result = yield (0, product_repo_1.createProduct)(product);
    return result;
});
exports.createProductService = createProductService;
const updateProductService = (id, data, user) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, product_repo_1.findProductById)(id);
    if (!product) {
        throw (0, appError_1.NewNotFoundError)("Product not found");
    }
    const store = yield (0, store_repo_1.findStoreByUserId)(user.id);
    if (!store || product.store._id.toString() !== store._id.toString()) {
        throw (0, appError_1.NewForbiddenError)("You are not authorized to update this product");
    }
    const updatedData = {
        name: data.name,
        category: new mongoose_1.default.Types.ObjectId(data.categoryId),
        description: data.description,
        price: data.price,
        stock: data.stock,
    };
    if (data.image) {
        const { publicPath } = yield (0, cloudinary_1.uploadFile)(data.image, "products");
        updatedData.imageUrl = publicPath;
    }
    return yield (0, product_repo_1.updateProduct)(id, updatedData);
});
exports.updateProductService = updateProductService;
const deleteProductService = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield (0, product_repo_1.findProductById)(id);
    if (!product) {
        throw (0, appError_1.NewNotFoundError)("Product not found");
    }
    const store = yield (0, store_repo_1.findStoreByUserId)(userId);
    if (!store || product.store._id.toString() !== store._id.toString()) {
        throw (0, appError_1.NewForbiddenError)("You are not authorized to delete this product");
    }
    return yield (0, product_repo_1.deleteProduct)(id);
});
exports.deleteProductService = deleteProductService;
