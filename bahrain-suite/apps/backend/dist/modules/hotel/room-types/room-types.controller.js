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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HotelRoomTypesController = void 0;
const common_1 = require("@nestjs/common");
const tenant_decorator_1 = require("../../../common/decorators/tenant.decorator");
const tenant_guard_1 = require("../../../common/guards/tenant.guard");
const roles_decorator_1 = require("../../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../../auth/user-role.enum");
const create_hotel_room_type_dto_1 = require("./dto/create-hotel-room-type.dto");
const find_hotel_room_types_dto_1 = require("./dto/find-hotel-room-types.dto");
const update_hotel_room_type_dto_1 = require("./dto/update-hotel-room-type.dto");
const room_types_service_1 = require("./room-types.service");
let HotelRoomTypesController = class HotelRoomTypesController {
    constructor(service) {
        this.service = service;
    }
    create(dto, tenantId) {
        return this.service.create(dto, tenantId);
    }
    findAll(query, tenantId) {
        return this.service.findAll(query, tenantId);
    }
    findOne(id, tenantId) {
        return this.service.findOne(id, tenantId);
    }
    update(id, dto, tenantId) {
        return this.service.update(id, dto, tenantId);
    }
};
exports.HotelRoomTypesController = HotelRoomTypesController;
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.PLATFORM_SUPER_ADMIN),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, tenant_decorator_1.Tenant)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_hotel_room_type_dto_1.CreateHotelRoomTypeDto, String]),
    __metadata("design:returntype", void 0)
], HotelRoomTypesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, tenant_decorator_1.Tenant)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_hotel_room_types_dto_1.FindHotelRoomTypesDto, String]),
    __metadata("design:returntype", void 0)
], HotelRoomTypesController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, tenant_decorator_1.Tenant)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], HotelRoomTypesController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.PLATFORM_SUPER_ADMIN),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, tenant_decorator_1.Tenant)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_hotel_room_type_dto_1.UpdateHotelRoomTypeDto, String]),
    __metadata("design:returntype", void 0)
], HotelRoomTypesController.prototype, "update", null);
exports.HotelRoomTypesController = HotelRoomTypesController = __decorate([
    (0, common_1.Controller)('hotel/room-types'),
    (0, common_1.UseGuards)(tenant_guard_1.TenantGuard),
    __metadata("design:paramtypes", [room_types_service_1.HotelRoomTypesService])
], HotelRoomTypesController);
//# sourceMappingURL=room-types.controller.js.map