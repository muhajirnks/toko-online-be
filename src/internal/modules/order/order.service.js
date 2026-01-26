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
exports.deleteOrderService = exports.updateOrderStatusService = exports.createOrderService = exports.getOrderByIdService = exports.listOrdersService = void 0;
const order_repo_1 = require("./order.repo");
const product_repo_1 = require("../product/product.repo");
const appError_1 = require("../../../pkg/apperror/appError");
const mongoose_1 = __importDefault(require("mongoose"));
const store_repo_1 = require("../store/store.repo");
const listOrdersService = (user, query) => __awaiter(void 0, void 0, void 0, function* () {
    if (user.role === "admin") {
        return yield (0, order_repo_1.findAllOrders)(query);
    }
    const store = yield (0, store_repo_1.findStoreByUserId)(user.id);
    if (store) {
        return yield (0, order_repo_1.findOrdersByStore)(store._id.toString(), query);
    }
    return yield (0, order_repo_1.findOrdersByUser)(user.id, query);
});
exports.listOrdersService = listOrdersService;
const getOrderByIdService = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const order = yield (0, order_repo_1.findOrderById)(id);
    if (!order) {
        throw (0, appError_1.NewNotFoundError)("Order not found");
    }
    // Check if user has access to this order
    if (user.role === "user" &&
        ((_a = order.userId) === null || _a === void 0 ? void 0 : _a.toString()) === user._id.toString()) {
        return order;
    }
    if (user.role === "admin") {
        return order;
    }
    const store = yield (0, store_repo_1.findStoreByUserId)(user.id);
    if (store) {
        const isSellerOfAnyItem = order.items.some((item) => {
            if (typeof item.product === "object" && "store" in item.product) {
                return item.product.store.toString() === store._id.toString();
            }
            return false;
        });
        if (isSellerOfAnyItem) {
            return order;
        }
    }
    throw (0, appError_1.NewNotFoundError)("Order not found");
});
exports.getOrderByIdService = getOrderByIdService;
const createOrderService = (user, data) => __awaiter(void 0, void 0, void 0, function* () {
    const { items } = data;
    let totalAmount = 0;
    const orderItems = [];
    for (const item of items) {
        const product = yield (0, product_repo_1.findProductById)(item.productId);
        if (!product) {
            throw (0, appError_1.NewNotFoundError)(`Product with ID ${item.productId} not found`);
        }
        if (product.stock < item.quantity) {
            throw (0, appError_1.NewBadRequestError)(`Product ${product.name} is out of stock`);
        }
        const price = product.price;
        totalAmount += price * item.quantity;
        orderItems.push({
            productId: product._id,
            name: product.name,
            quantity: item.quantity,
            price: price,
        });
        // Update stock
        yield (0, product_repo_1.updateProduct)(product._id.toString(), {
            stock: product.stock - item.quantity,
        });
    }
    const orderData = {
        userId: new mongoose_1.default.Types.ObjectId(user.id),
        customerName: user.name,
        customerEmail: user.email,
        items: orderItems.map((item) => (Object.assign(Object.assign({}, item), { product: item.productId }))),
        totalAmount,
        status: "pending",
    };
    return yield (0, order_repo_1.createOrder)(orderData);
});
exports.createOrderService = createOrderService;
const updateOrderStatusService = (id, user, data) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield (0, order_repo_1.findOrderById)(id);
    if (!order) {
        throw (0, appError_1.NewNotFoundError)("Order not found");
    }
    if (user.role === "admin") {
        return yield (0, order_repo_1.updateOrder)(id, { status: data.status });
    }
    const store = yield (0, store_repo_1.findStoreByUserId)(user.id);
    if (!store) {
        throw (0, appError_1.NewForbiddenError)("You are not authorized to update this order");
    }
    const isSellerOfAnyItem = order.items.some((item) => {
        if (typeof item.product === "object" && "store" in item.product) {
            return item.product.store.toString() === store._id.toString();
        }
        return false;
    });
    if (!isSellerOfAnyItem) {
        throw (0, appError_1.NewForbiddenError)("You are not authorized to update this order");
    }
    return yield (0, order_repo_1.updateOrder)(id, { status: data.status });
});
exports.updateOrderStatusService = updateOrderStatusService;
const deleteOrderService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield (0, order_repo_1.findOrderById)(id);
    if (!order) {
        throw (0, appError_1.NewNotFoundError)("Order not found");
    }
    return yield (0, order_repo_1.updateOrder)(id, { status: "cancelled" });
});
exports.deleteOrderService = deleteOrderService;
