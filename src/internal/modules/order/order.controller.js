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
exports.deleteOrderHandler = exports.updateOrderHandler = exports.createOrderHandler = exports.getOrderByIdHandler = exports.listOrdersHandler = void 0;
const order_validation_1 = require("./order.validation");
const order_service_1 = require("./order.service");
const success_1 = require("../../../pkg/response/success");
const listOrdersHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield order_validation_1.listOrderSchema.validate(req.query);
    const data = yield (0, order_service_1.listOrdersService)(req.user, query);
    (0, success_1.paginationResponse)(res, data);
});
exports.listOrdersHandler = listOrdersHandler;
const getOrderByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield (0, order_service_1.getOrderByIdService)(id, req.user);
    (0, success_1.successResponse)(res, { data });
});
exports.getOrderByIdHandler = getOrderByIdHandler;
const createOrderHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield order_validation_1.createOrderSchema.validate(req.body);
    const data = yield (0, order_service_1.createOrderService)(req.user, body);
    (0, success_1.createdResponse)(res, { data, message: "Order created successfully" });
});
exports.createOrderHandler = createOrderHandler;
const updateOrderHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = yield order_validation_1.updateOrderStatusSchema.validate(req.body);
    const data = yield (0, order_service_1.updateOrderStatusService)(id, req.user, body);
    (0, success_1.successResponse)(res, { data, message: "Order updated successfully" });
});
exports.updateOrderHandler = updateOrderHandler;
const deleteOrderHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield (0, order_service_1.deleteOrderService)(id);
    (0, success_1.successResponse)(res, { message: "Order deleted successfully" });
});
exports.deleteOrderHandler = deleteOrderHandler;
