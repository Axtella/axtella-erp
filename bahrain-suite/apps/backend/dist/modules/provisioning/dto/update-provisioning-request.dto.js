"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProvisioningRequestDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_provisioning_request_dto_1 = require("./create-provisioning-request.dto");
class UpdateProvisioningRequestDto extends (0, mapped_types_1.PartialType)(create_provisioning_request_dto_1.CreateProvisioningRequestDto) {
}
exports.UpdateProvisioningRequestDto = UpdateProvisioningRequestDto;
//# sourceMappingURL=update-provisioning-request.dto.js.map