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
exports.updateOrder = exports.createOrder = exports.findOrderById = exports.findOrdersByUser = exports.findOrdersByStore = void 0;
const order_1 = __importDefault(require("../../../internal/models/order"));
const product_1 = __importDefault(require("../../../internal/models/product"));
const findOrdersByStore = (storeId, query) => __awaiter(void 0, void 0, void 0, function* () {
    // 1. Ambil semua product ID yang dimiliki oleh store tersebut
    const products = yield product_1.default.find({ store: storeId }, "_id").lean();
    const productIds = products.map((p) => p._id);
    const filter = {
        "items.product": { $in: productIds },
    };
    if (query.status) {
        filter.status = query.status;
    }
    if (query.userId) {
        filter.userId = query.userId;
    }
    if (query.search) {
        filter.$or = [
            // { _id: { $regex: query.search, $options: "i" } },
            { customerName: { $regex: query.search, $options: "i" } },
            { customerEmail: { $regex: query.search, $options: "i" } },
            { "items.name": { $regex: query.search, $options: "i" } },
        ];
    }
    return yield order_1.default.paginate(filter, {
        page: query.page,
        limit: query.limit,
        sort: [
            [query.sort, query.direction],
            ["_id", "desc"],
        ],
        lean: true,
        populate: {
            path: "items.product",
        },
    });
});
exports.findOrdersByStore = findOrdersByStore;
const findOrdersByUser = (userId, query) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = { userId };
    if (query.status) {
        filter.status = query.status;
    }
    if (query.storeId) {
        const products = yield product_1.default.find({ store: query.storeId }, "_id").lean();
        const productIds = products.map((p) => p._id);
        filter["items.product"] = { $in: productIds };
    }
    if (query.search) {
        filter.$or = [
            // { _id: { $regex: query.search, $options: "i" } },
            { customerName: { $regex: query.search, $options: "i" } },
            { customerEmail: { $regex: query.search, $options: "i" } },
            { "items.name": { $regex: query.search, $options: "i" } },
        ];
    }
    return yield order_1.default.paginate(filter, {
        page: query.page,
        limit: query.limit,
        sort: [
            [query.sort, query.direction],
            ["_id", "desc"],
        ],
        lean: true,
        populate: ["items.product"],
    });
});
exports.findOrdersByUser = findOrdersByUser;
const findOrderById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_1.default.findById(id).populate("items.product").exec();
});
exports.findOrderById = findOrderById;
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_1.default.create(data);
    return result.toObject();
});
exports.createOrder = createOrder;
const updateOrder = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_1.default.findByIdAndUpdate(id, data, { new: true }).exec();
});
exports.updateOrder = updateOrder;
