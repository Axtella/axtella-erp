"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperatingDaybookModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const property_entity_1 = require("../properties/entities/property.entity");
const operating_daybook_entry_entity_1 = require("./entities/operating-daybook-entry.entity");
const operating_daybook_controller_1 = require("./operating-daybook.controller");
const operating_daybook_service_1 = require("./operating-daybook.service");
let OperatingDaybookModule = class OperatingDaybookModule {
};
exports.OperatingDaybookModule = OperatingDaybookModule;
exports.OperatingDaybookModule = OperatingDaybookModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([operating_daybook_entry_entity_1.OperatingDaybookEntry, property_entity_1.Property])],
        controllers: [operating_daybook_controller_1.OperatingDaybookController],
        providers: [operating_daybook_service_1.OperatingDaybookService],
    })
], OperatingDaybookModule);
//# sourceMappingURL=operating-daybook.module.js.map