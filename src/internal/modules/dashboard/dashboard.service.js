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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSellerDashboardService = exports.getAdminDashboardService = void 0;
const dashboard_repo_1 = require("./dashboard.repo");
const store_repo_1 = require("../store/store.repo");
const getAdminDashboardService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, dashboard_repo_1.getAdminStats)();
});
exports.getAdminDashboardService = getAdminDashboardService;
const getSellerDashboardService = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const store = yield (0, store_repo_1.findStoreByUserId)(user._id.toString());
    if (!store) {
        throw new Error("Store not found for this user");
    }
    return yield (0, dashboard_repo_1.getSellerStats)(store._id.toString());
});
exports.getSellerDashboardService = getSellerDashboardService;
