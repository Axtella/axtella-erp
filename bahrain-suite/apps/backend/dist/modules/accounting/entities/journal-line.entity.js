"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalLine = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
let JournalLine = class JournalLine extends base_entity_1.AppBaseEntity {
};
exports.JournalLine = JournalLine;
__decorate([
    (0, typeorm_1.Column)({ name: 'journal_entry_id', type: 'uuid' }),
    __metadata("design:type", String)
], JournalLine.prototype, "journalEntryId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'account_code', length: 50 }),
    __metadata("design:type", String)
], JournalLine.prototype, "accountCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], JournalLine.prototype, "debit", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 14, scale: 2, default: 0 }),
    __metadata("design:type", Number)
], JournalLine.prototype, "credit", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'income_channel', length: 30, nullable: true }),
    __metadata("design:type", String)
], JournalLine.prototype, "incomeChannel", void 0);
exports.JournalLine = JournalLine = __decorate([
    (0, typeorm_1.Entity)({ name: 'journal_lines' })
], JournalLine);
//# sourceMappingURL=journal-line.entity.js.map