"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTenantSettingDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_tenant_setting_dto_1 = require("./create-tenant-setting.dto");
class UpdateTenantSettingDto extends (0, mapped_types_1.PartialType)(create_tenant_setting_dto_1.CreateTenantSettingDto) {
}
exports.UpdateTenantSettingDto = UpdateTenantSettingDto;
//# sourceMappingURL=update-tenant-setting.dto.js.map