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
exports.deleteCategoryService = exports.updateCategoryService = exports.createCategoryService = exports.getCategoryByIdService = exports.listCategoriesService = void 0;
const category_repo_1 = require("./category.repo");
const appError_1 = require("../../../pkg/apperror/appError");
const listCategoriesService = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, category_repo_1.findAllCategories)(query);
});
exports.listCategoriesService = listCategoriesService;
const getCategoryByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield (0, category_repo_1.findCategoryById)(id);
    if (!category) {
        throw (0, appError_1.NewNotFoundError)("Category not found");
    }
    return category;
});
exports.getCategoryByIdService = getCategoryByIdService;
const createCategoryService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, category_repo_1.createCategory)(data);
});
exports.createCategoryService = createCategoryService;
const updateCategoryService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield (0, category_repo_1.findCategoryById)(id);
    if (!category) {
        throw (0, appError_1.NewNotFoundError)("Category not found");
    }
    return yield (0, category_repo_1.updateCategory)(id, data);
});
exports.updateCategoryService = updateCategoryService;
const deleteCategoryService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield (0, category_repo_1.findCategoryById)(id);
    if (!category) {
        throw (0, appError_1.NewNotFoundError)("Category not found");
    }
    return yield (0, category_repo_1.deleteCategory)(id);
});
exports.deleteCategoryService = deleteCategoryService;
