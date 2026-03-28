"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccessControlModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const access_control_service_1 = require("./access-control.service");
const permission_entity_1 = require("./entities/permission.entity");
const role_permission_entity_1 = require("./entities/role-permission.entity");
const role_entity_1 = require("./entities/role.entity");
const user_entity_1 = require("./entities/user.entity");
const user_role_entity_1 = require("./entities/user-role.entity");
let AccessControlModule = class AccessControlModule {
};
exports.AccessControlModule = AccessControlModule;
exports.AccessControlModule = AccessControlModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, role_entity_1.RoleEntity, permission_entity_1.PermissionEntity, user_role_entity_1.UserRoleEntity, role_permission_entity_1.RolePermissionEntity])],
        providers: [access_control_service_1.AccessControlService],
        exports: [access_control_service_1.AccessControlService, typeorm_1.TypeOrmModule],
    })
], AccessControlModule);
//# sourceMappingURL=access-control.module.js.map