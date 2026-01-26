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
exports.updateMyStore = exports.createMyStore = exports.getMyStore = void 0;
const store_service_1 = require("./store.service");
const success_1 = require("../../../pkg/response/success");
const store_validation_1 = require("./store.validation");
const getMyStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield (0, store_service_1.getMyStoreService)(req.user.id);
    (0, success_1.successResponse)(res, { data: result });
});
exports.getMyStore = getMyStore;
const createMyStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield store_validation_1.createStoreSchema.validate(Object.assign(Object.assign({}, req.body), { avatar: req.file }));
    const result = yield (0, store_service_1.createMyStoreService)(req.user.id, body);
    (0, success_1.createdResponse)(res, { data: result, message: "Store created successfully" });
});
exports.createMyStore = createMyStore;
const updateMyStore = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield store_validation_1.updateStoreSchema.validate(Object.assign(Object.assign({}, req.body), { avatar: req.file }));
    const result = yield (0, store_service_1.updateMyStoreService)(req.user.id, body);
    (0, success_1.successResponse)(res, { data: result, message: "Store updated successfully" });
});
exports.updateMyStore = updateMyStore;
