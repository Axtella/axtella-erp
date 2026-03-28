"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePagination = normalizePagination;
exports.pagedResult = pagedResult;
function normalizePagination(query) {
    const page = Math.max(1, Number(query.page || 1));
    const limit = Math.max(1, Math.min(200, Number(query.limit || 20)));
    return { page, limit };
}
function pagedResult(items, total, page, limit) {
    return { items, total, page, limit };
}
//# sourceMappingURL=pagination.util.js.map