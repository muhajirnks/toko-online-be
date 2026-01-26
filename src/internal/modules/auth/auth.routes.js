"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const auth_1 = __importDefault(require("../../../internal/middleware/auth"));
const async_1 = require("../../../internal/middleware/async");
const router = (0, express_1.Router)();
router.post("/register", (0, async_1.asyncHandler)(auth_controller_1.registerHandler));
router.post("/login", (0, async_1.asyncHandler)(auth_controller_1.loginHandler));
router.post("/refresh", (0, async_1.asyncHandler)(auth_controller_1.refreshHandler));
router.get("/profile", auth_1.default, (0, async_1.asyncHandler)(auth_controller_1.getProfileHandler));
router.post("/logout", (0, async_1.asyncHandler)(auth_controller_1.logoutHandler));
exports.default = router;
