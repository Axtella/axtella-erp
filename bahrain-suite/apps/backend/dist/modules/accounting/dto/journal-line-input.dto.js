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
exports.JournalLineInputDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const income_channels_1 = require("../income-channels");
class JournalLineInputDto {
}
exports.JournalLineInputDto = JournalLineInputDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: '4000' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], JournalLineInputDto.prototype, "accountCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1000 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], JournalLineInputDto.prototype, "debit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0 }),
    (0, class_transformer_1.Type)(() => Number),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], JournalLineInputDto.prototype, "credit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        enum: income_channels_1.INCOME_CHANNELS,
        description: 'For revenue lines: cash_receipt | pos | benefit_pay (income & expense by channel)',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)([...income_channels_1.INCOME_CHANNELS]),
    __metadata("design:type", Object)
], JournalLineInputDto.prototype, "incomeChannel", void 0);
//# sourceMappingURL=journal-line-input.dto.js.map