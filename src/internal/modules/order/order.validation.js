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
exports.listSellerOrderSchema = exports.listBuyerOrderSchema = exports.listOrderBaseSchema = exports.updateOrderStatusSchema = exports.createOrderSchema = void 0;
const yup = __importStar(require("yup"));
exports.createOrderSchema = yup.object({
    items: yup
        .array()
        .of(yup.object({
        productId: yup.string().required(),
        quantity: yup.number().required().min(1),
    }))
        .required()
        .min(1),
});
exports.updateOrderStatusSchema = yup.object({
    status: yup
        .string()
        .oneOf(["pending", "paid", "shipped", "completed", "cancelled"])
        .required(),
});
exports.listOrderBaseSchema = {
    page: yup.number().optional().min(1).default(1),
    limit: yup.number().optional().min(1).max(100).default(10),
    sort: yup
        .string()
        .optional()
        .oneOf(["_id", "customerName", "customerEmail", "createdAt", "updatedAt"])
        .default("_id"),
    direction: yup.string().oneOf(["asc", "desc"]).optional().default("desc"),
    search: yup.string().optional(),
    status: yup
        .string()
        .oneOf(["pending", "paid", "shipped", "completed", "cancelled"])
        .optional(),
};
exports.listBuyerOrderSchema = yup.object(Object.assign(Object.assign({}, exports.listOrderBaseSchema), { storeId: yup.string().optional() }));
exports.listSellerOrderSchema = yup.object(Object.assign(Object.assign({}, exports.listOrderBaseSchema), { userId: yup.string().optional() }));
