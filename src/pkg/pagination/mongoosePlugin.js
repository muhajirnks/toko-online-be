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
const paginationPlugin = (schema) => {
    schema.statics.paginate = function () {
        return __awaiter(this, arguments, void 0, function* (query = {}, options = {}) {
            const page = Math.max(1, options.page || 1);
            const limit = Math.max(1, options.limit || 10);
            const skip = (page - 1) * limit;
            let docQuery = this.find(query);
            if (options.select)
                docQuery = docQuery.select(options.select);
            if (options.sort)
                docQuery = docQuery.sort(options.sort);
            if (options.populate)
                docQuery = docQuery.populate(options.populate);
            const [docs, totalDocs] = yield Promise.all([
                docQuery.skip(skip).limit(limit).lean(!!options.lean).exec(),
                this.countDocuments(query).exec(),
            ]);
            const totalPages = Math.ceil(totalDocs / limit);
            return {
                meta: {
                    currentPage: page,
                    lastPage: totalPages,
                    perPage: limit,
                    total: totalDocs,
                },
                data: docs,
            };
        });
    };
};
exports.default = paginationPlugin;
