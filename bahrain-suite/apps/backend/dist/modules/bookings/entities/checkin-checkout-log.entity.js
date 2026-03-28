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
exports.CheckinCheckoutLog = void 0;
const typeorm_1 = require("typeorm");
const base_entity_1 = require("../../../common/base/base.entity");
let CheckinCheckoutLog = class CheckinCheckoutLog extends base_entity_1.AppBaseEntity {
};
exports.CheckinCheckoutLog = CheckinCheckoutLog;
__decorate([
    (0, typeorm_1.Column)({ name: 'booking_id', type: 'uuid' }),
    __metadata("design:type", String)
], CheckinCheckoutLog.prototype, "bookingId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'property_id', type: 'uuid' }),
    __metadata("design:type", String)
], CheckinCheckoutLog.prototype, "propertyId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'unit_id', type: 'uuid' }),
    __metadata("design:type", String)
], CheckinCheckoutLog.prototype, "unitId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'log_type', length: 30 }),
    __metadata("design:type", String)
], CheckinCheckoutLog.prototype, "logType", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'event_time', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }),
    __metadata("design:type", Date)
], CheckinCheckoutLog.prototype, "eventTime", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], CheckinCheckoutLog.prototype, "remarks", void 0);
exports.CheckinCheckoutLog = CheckinCheckoutLog = __decorate([
    (0, typeorm_1.Entity)({ name: 'checkin_checkout_logs' })
], CheckinCheckoutLog);
//# sourceMappingURL=checkin-checkout-log.entity.js.map