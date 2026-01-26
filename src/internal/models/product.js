"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    imageUrl: { type: String, required: true },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Category",
        required: true,
    },
    store: { type: mongoose_1.Schema.Types.ObjectId, ref: "Store", required: true },
}, {
    timestamps: true,
    versionKey: false,
});
const Product = (0, mongoose_1.model)("Product", productSchema);
exports.default = Product;
