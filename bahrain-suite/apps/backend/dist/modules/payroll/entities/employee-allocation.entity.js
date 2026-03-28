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
exports.EmployeeAllocation = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
let EmployeeAllocation = class EmployeeAllocation extends base_entity_1.AppBaseEntity {
};
exports.EmployeeAllocation = EmployeeAllocation;
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_id', type: 'uuid' }),
    __metadata("design:type", String)
], EmployeeAllocation.prototype, "employeeId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'property_id', type: 'uuid' }),
    __metadata("design:type", String)
], EmployeeAllocation.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'allocation_basis', length: 50 }),
    __metadata("design:type", String)
], EmployeeAllocation.prototype, "allocationBasis", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'numeric', precision: 8, scale: 4 }),
    __metadata("design:type", Number)
], EmployeeAllocation.prototype, "percentage", void 0);
exports.EmployeeAllocation = EmployeeAllocation = __decorate([
    (0, typeorm_1.Entity)({ name: 'employee_allocations' })
], EmployeeAllocation);
//# sourceMappingURL=employee-allocation.entity.js.map