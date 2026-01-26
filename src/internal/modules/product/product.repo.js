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
exports.deleteProduct = exports.updateProduct = exports.createProduct = exports.findProductById = exports.findAllProducts = void 0;
const product_1 = __importDefault(require("../../../internal/models/product"));
const findAllProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (query.search) {
        filter.name = { $regex: query.search, $options: "i" };
    }
    if (query.category) {
        filter.category = query.category;
    }
    if (query.storeId) {
        filter.store = query.storeId;
    }
    if (query.minPrice !== undefined || query.maxPrice !== undefined) {
        filter.price = {};
        if (query.minPrice !== undefined)
            filter.price.$gte = query.minPrice;
        if (query.maxPrice !== undefined)
            filter.price.$lte = query.maxPrice;
    }
    return yield product_1.default.paginate(filter, {
        page: query.page,
        limit: query.limit,
        sort: [[query.sort, query.direction], ["_id", "desc"]],
        lean: true,
        populate: ["category", "store"],
    });
});
exports.findAllProducts = findAllProducts;
const findProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_1.default.findById(id).populate("category").populate("store").lean().exec();
});
exports.findProductById = findProductById;
const createProduct = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = yield product_1.default.create(data);
    return doc.toObject();
});
exports.createProduct = createProduct;
const updateProduct = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_1.default.findByIdAndUpdate(id, data, { new: true }).lean().exec();
});
exports.updateProduct = updateProduct;
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield product_1.default.findByIdAndDelete(id).exec();
});
exports.deleteProduct = deleteProduct;
