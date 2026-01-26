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
exports.deleteCategoryHandler = exports.updateCategoryHandler = exports.createCategoryHandler = exports.getCategoryByIdHandler = exports.listCategoriesHandler = void 0;
const category_validation_1 = require("./category.validation");
const category_service_1 = require("./category.service");
const success_1 = require("../../../pkg/response/success");
const listCategoriesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = yield category_validation_1.listCategorySchema.validate(req.query);
    const data = yield (0, category_service_1.listCategoriesService)(query);
    (0, success_1.paginationResponse)(res, data);
});
exports.listCategoriesHandler = listCategoriesHandler;
const getCategoryByIdHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield (0, category_service_1.getCategoryByIdService)(id);
    (0, success_1.successResponse)(res, { data });
});
exports.getCategoryByIdHandler = getCategoryByIdHandler;
const createCategoryHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = yield category_validation_1.createCategorySchema.validate(req.body);
    const data = yield (0, category_service_1.createCategoryService)(body);
    (0, success_1.createdResponse)(res, { data, message: "Category created successfully" });
});
exports.createCategoryHandler = createCategoryHandler;
const updateCategoryHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const body = yield category_validation_1.updateCategorySchema.validate(req.body);
    const data = yield (0, category_service_1.updateCategoryService)(id, body);
    (0, success_1.successResponse)(res, { data, message: "Category updated successfully" });
});
exports.updateCategoryHandler = updateCategoryHandler;
const deleteCategoryHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    yield (0, category_service_1.deleteCategoryService)(id);
    (0, success_1.successResponse)(res, { message: "Category deleted successfully" });
});
exports.deleteCategoryHandler = deleteCategoryHandler;
