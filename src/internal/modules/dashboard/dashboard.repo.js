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
exports.getSellerStats = exports.getAdminStats = void 0;
const user_1 = __importDefault(require("../../../internal/models/user"));
const store_1 = __importDefault(require("../../../internal/models/store"));
const product_1 = __importDefault(require("../../../internal/models/product"));
const order_1 = __importDefault(require("../../../internal/models/order"));
const getAdminStats = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const [totalUsers, totalStores, totalProducts, totalOrders, revenueData] = yield Promise.all([
        user_1.default.countDocuments({ role: "user" }),
        store_1.default.countDocuments(),
        product_1.default.countDocuments(),
        order_1.default.countDocuments(),
        order_1.default.aggregate([
            { $match: { status: { $ne: "cancelled" } } },
            { $group: { _id: null, totalRevenue: { $sum: "$totalAmount" } } }
        ])
    ]);
    return {
        totalUsers,
        totalStores,
        totalProducts,
        totalOrders,
        totalRevenue: ((_a = revenueData[0]) === null || _a === void 0 ? void 0 : _a.totalRevenue) || 0,
    };
});
exports.getAdminStats = getAdminStats;
const getSellerStats = (storeId) => __awaiter(void 0, void 0, void 0, function* () {
    const [totalProducts, orders] = yield Promise.all([
        product_1.default.countDocuments({ store: storeId }),
        order_1.default.find({ "items.product": { $exists: true } })
            .populate({
            path: "items.product",
            match: { store: storeId }
        })
            .lean()
    ]);
    // Filter orders that actually contain products from this store
    const sellerOrders = orders.filter(order => order.items.some(item => { var _a; return item.product && ((_a = item.product.store) === null || _a === void 0 ? void 0 : _a.toString()) === storeId; }));
    const totalOrders = sellerOrders.length;
    // Calculate revenue only for items belonging to this store
    let totalRevenue = 0;
    sellerOrders.forEach(order => {
        if (order.status !== "cancelled") {
            order.items.forEach(item => {
                var _a;
                if (item.product && ((_a = item.product.store) === null || _a === void 0 ? void 0 : _a.toString()) === storeId) {
                    totalRevenue += item.price * item.quantity;
                }
            });
        }
    });
    // Get recent orders (last 5)
    const recentOrders = sellerOrders
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        .slice(0, 5);
    return {
        totalProducts,
        totalOrders,
        totalRevenue,
        recentOrders,
    };
});
exports.getSellerStats = getSellerStats;
