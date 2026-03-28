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
exports.HotelHousekeepingTask = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../../common/base/base.entity");
let HotelHousekeepingTask = class HotelHousekeepingTask extends base_entity_1.AppBaseEntity {
};
exports.HotelHousekeepingTask = HotelHousekeepingTask;
__decorate([
    (0, typeorm_1.Column)({ name: 'customer_id', type: 'uuid' }),
    __metadata("design:type", String)
], HotelHousekeepingTask.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'property_id', type: 'uuid' }),
    __metadata("design:type", String)
], HotelHousekeepingTask.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'room_id', type: 'uuid' }),
    __metadata("design:type", String)
], HotelHousekeepingTask.prototype, "roomId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'task_type', length: 30, default: 'cleaning' }),
    __metadata("design:type", String)
], HotelHousekeepingTask.prototype, "taskType", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 30, default: 'open' }),
    __metadata("design:type", String)
], HotelHousekeepingTask.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'assigned_to', length: 120, nullable: true }),
    __metadata("design:type", String)
], HotelHousekeepingTask.prototype, "assignedTo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'scheduled_for', type: 'date', nullable: true }),
    __metadata("design:type", String)
], HotelHousekeepingTask.prototype, "scheduledFor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'completed_at', type: 'timestamptz', nullable: true }),
    __metadata("design:type", Date)
], HotelHousekeepingTask.prototype, "completedAt", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], HotelHousekeepingTask.prototype, "notes", void 0);
exports.HotelHousekeepingTask = HotelHousekeepingTask = __decorate([
    (0, typeorm_1.Entity)({ name: 'hotel_housekeeping_tasks' })
], HotelHousekeepingTask);
//# sourceMappingURL=hotel-housekeeping-task.entity.js.map