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
exports.deleteProductHandler = exports.updateProductHandler = exports.createProductHandler = exports.getProductByIdHandler = exports.listProductsHandler = void 0;
const product_validation_1 = require("./product.validation");
const product_service_1 = require("./product.service");
const success_1 = require("../../../pkg/response/success");
const listProductsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield product_validation_1.listProductSchema.validate(req.query);
    const data = yield (0, product_service_1.listProductsService)(query);
    (0, success_1.paginationResponse)(res, data);
});
exports.listProductsHandler = listProductsHandler;
const getProductByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield (0, product_service_1.getProductByIdService)(id);
    (0, success_1.successResponse)(res, { data });
});
exports.getProductByIdHandler = getProductByIdHandler;
const createProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.body.image = req.file;
    const body = yield product_validation_1.createProductSchema.validate(req.body);
    const data = yield (0, product_service_1.createProductService)(body, req.user);
    (0, success_1.createdResponse)(res, { data, message: "Product created successfully" });
});
exports.createProductHandler = createProductHandler;
const updateProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    req.body.image = req.file;
    const body = yield product_validation_1.updateProductSchema.validate(req.body);
    const data = yield (0, product_service_1.updateProductService)(id, body, req.user);
    (0, success_1.successResponse)(res, { data, message: "Product updated successfully" });
});
exports.updateProductHandler = updateProductHandler;
const deleteProductHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield (0, product_service_1.deleteProductService)(id, req.user.id);
    (0, success_1.successResponse)(res, { message: "Product deleted successfully" });
});
exports.deleteProductHandler = deleteProductHandler;
