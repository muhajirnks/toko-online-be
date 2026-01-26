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
const product_controller_1 = require("./product.controller");
const auth_1 = __importStar(require("../../../internal/middleware/auth"));
const upload_1 = require("../../../internal/middleware/upload");
const async_1 = require("../../../internal/middleware/async");
const productRoutes = (0, express_1.Router)();
// Everyone can view products
productRoutes.get("/", (0, async_1.asyncHandler)(product_controller_1.listProductsHandler));
productRoutes.get("/:id", (0, async_1.asyncHandler)(product_controller_1.getProductByIdHandler));
// Only user with store can manage products
productRoutes.use(auth_1.default, (0, auth_1.authorize)(["user"]));
productRoutes.post("/", upload_1.uploadProductImage, (0, async_1.asyncHandler)(product_controller_1.createProductHandler));
productRoutes.put("/:id", upload_1.uploadProductImage, (0, async_1.asyncHandler)(product_controller_1.updateProductHandler));
productRoutes.delete("/:id", (0, async_1.asyncHandler)(product_controller_1.deleteProductHandler));
exports.default = productRoutes;
