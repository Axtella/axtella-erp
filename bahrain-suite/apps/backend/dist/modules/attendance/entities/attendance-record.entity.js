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
exports.AttendanceRecord = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
let AttendanceRecord = class AttendanceRecord extends base_entity_1.AppBaseEntity {
};
exports.AttendanceRecord = AttendanceRecord;
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_code', length: 50 }),
    __metadata("design:type", String)
], AttendanceRecord.prototype, "employeeCode", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'employee_name', length: 200, nullable: true }),
    __metadata("design:type", String)
], AttendanceRecord.prototype, "employeeName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'work_date', type: 'date' }),
    __metadata("design:type", String)
], AttendanceRecord.prototype, "workDate", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'clock_in', type: 'varchar', length: 8, nullable: true }),
    __metadata("design:type", String)
], AttendanceRecord.prototype, "clockIn", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'clock_out', type: 'varchar', length: 8, nullable: true }),
    __metadata("design:type", String)
], AttendanceRecord.prototype, "clockOut", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, default: 'present' }),
    __metadata("design:type", String)
], AttendanceRecord.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'property_id', type: 'uuid', nullable: true }),
    __metadata("design:type", String)
], AttendanceRecord.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], AttendanceRecord.prototype, "notes", void 0);
exports.AttendanceRecord = AttendanceRecord = __decorate([
    (0, typeorm_1.Entity)({ name: 'attendance_records' })
], AttendanceRecord);
//# sourceMappingURL=attendance-record.entity.js.map