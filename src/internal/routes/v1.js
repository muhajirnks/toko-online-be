"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("../../internal/modules/auth/auth.routes"));
const product_routes_1 = __importDefault(require("../../internal/modules/product/product.routes"));
const order_routes_1 = __importDefault(require("../../internal/modules/order/order.routes"));
const category_routes_1 = __importDefault(require("../../internal/modules/category/category.routes"));
const user_routes_1 = __importDefault(require("../../internal/modules/user/user.routes"));
const store_routes_1 = __importDefault(require("../../internal/modules/store/store.routes"));
const dashboard_routes_1 = __importDefault(require("../../internal/modules/dashboard/dashboard.routes"));
const initV1Route = () => {
    const router = (0, express_1.Router)();
    router.use("/auth", auth_routes_1.default);
    router.use("/products", product_routes_1.default);
    router.use("/orders", order_routes_1.default);
    router.use("/categories", category_routes_1.default);
    router.use("/users", user_routes_1.default);
    router.use("/stores", store_routes_1.default);
    router.use("/dashboard", dashboard_routes_1.default);
    return router;
};
exports.default = initV1Route;
