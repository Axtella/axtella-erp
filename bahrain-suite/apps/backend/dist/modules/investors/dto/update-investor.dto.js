"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateInvestorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_investor_dto_1 = require("./create-investor.dto");
class UpdateInvestorDto extends (0, mapped_types_1.PartialType)(create_investor_dto_1.CreateInvestorDto) {
}
exports.UpdateInvestorDto = UpdateInvestorDto;
//# sourceMappingURL=update-investor.dto.js.map