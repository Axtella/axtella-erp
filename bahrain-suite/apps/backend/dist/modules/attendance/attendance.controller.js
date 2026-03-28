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
exports.AttendanceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const roles_decorator_1 = require("../auth/decorators/roles.decorator");
const user_role_enum_1 = require("../auth/user-role.enum");
const attendance_service_1 = require("./attendance.service");
const create_attendance_record_dto_1 = require("./dto/create-attendance-record.dto");
const find_attendance_dto_1 = require("./dto/find-attendance.dto");
const READ = [
    user_role_enum_1.UserRole.ADMIN,
    user_role_enum_1.UserRole.ACCOUNTANT,
    user_role_enum_1.UserRole.HR,
    user_role_enum_1.UserRole.DEVELOPER,
    user_role_enum_1.UserRole.STAFF,
];
let AttendanceController = class AttendanceController {
    constructor(service) {
        this.service = service;
    }
    list(query) {
        return this.service.findAll(query);
    }
    create(dto) {
        return this.service.create(dto);
    }
};
exports.AttendanceController = AttendanceController;
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'List attendance records (filters optional)' }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_attendance_dto_1.FindAttendanceDto]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(user_role_enum_1.UserRole.ADMIN, user_role_enum_1.UserRole.HR),
    (0, swagger_1.ApiOperation)({ summary: 'Record attendance / time entry' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_attendance_record_dto_1.CreateAttendanceRecordDto]),
    __metadata("design:returntype", void 0)
], AttendanceController.prototype, "create", null);
exports.AttendanceController = AttendanceController = __decorate([
    (0, swagger_1.ApiTags)('attendance'),
    (0, swagger_1.ApiBearerAuth)('access-token'),
    (0, common_1.Controller)('attendance'),
    (0, roles_decorator_1.Roles)(...READ),
    __metadata("design:paramtypes", [attendance_service_1.AttendanceService])
], AttendanceController);
//# sourceMappingURL=attendance.controller.js.map