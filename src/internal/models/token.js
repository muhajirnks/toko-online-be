"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const tokenSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    refreshToken: {
        type: String,
        required: true,
        unique: true,
    },
    lastUsed: {
        type: Date,
        required: true,
    },
}, { timestamps: true, versionKey: false });
const Token = (0, mongoose_1.model)("Token", tokenSchema);
exports.default = Token;
