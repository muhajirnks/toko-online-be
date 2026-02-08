"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_controller_1 = require("./order.controller");
const auth_1 = __importStar(require("../../../internal/middleware/auth"));
const orderRoutes = (0, express_1.Router)();
orderRoutes.use(auth_1.default);
// User can create orders
orderRoutes.post("/", (0, auth_1.authorize)(["user"]), order_controller_1.createOrderHandler);
// List orders
orderRoutes.get("/", (0, auth_1.authorize)(["user"]), order_controller_1.listBuyerOrdersHandler);
orderRoutes.get("/seller", (0, auth_1.authorize)(["user"]), order_controller_1.listSellerOrdersHandler);
orderRoutes.get("/:id", (0, auth_1.authorize)(["admin", "user"]), order_controller_1.getOrderByIdHandler);
// Admin and User (with store) can update status
orderRoutes.put("/:id", (0, auth_1.authorize)(["admin", "user"]), order_controller_1.updateOrderHandler);
orderRoutes.delete("/:id", (0, auth_1.authorize)(["admin"]), order_controller_1.deleteOrderHandler);
exports.default = orderRoutes;
