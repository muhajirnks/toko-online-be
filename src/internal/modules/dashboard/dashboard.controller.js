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
exports.getSellerDashboardHandler = exports.getAdminDashboardHandler = void 0;
const dashboard_service_1 = require("./dashboard.service");
const success_1 = require("../../../pkg/response/success");
const getAdminDashboardHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, dashboard_service_1.getAdminDashboardService)();
    (0, success_1.successResponse)(res, { data });
});
exports.getAdminDashboardHandler = getAdminDashboardHandler;
const getSellerDashboardHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield (0, dashboard_service_1.getSellerDashboardService)(req.user);
    (0, success_1.successResponse)(res, { data });
});
exports.getSellerDashboardHandler = getSellerDashboardHandler;
