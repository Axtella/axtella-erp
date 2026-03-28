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
exports.AccessControlService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
let AccessControlService = class AccessControlService {
    constructor(dataSource) {
        this.dataSource = dataSource;
    }
    async getRolesForUser(userId) {
        const rows = await this.dataSource.query(`
      SELECT r.code
      FROM roles r
      INNER JOIN user_roles ur ON ur.role_id = r.id
      WHERE ur.user_id = $1
      ORDER BY r.code ASC
      `, [userId]);
        return rows.map((row) => row.code);
    }
    async getPermissionsForUser(userId) {
        const rows = await this.dataSource.query(`
      SELECT DISTINCT p.code
      FROM permissions p
      INNER JOIN role_permissions rp ON rp.permission_id = p.id
      INNER JOIN user_roles ur ON ur.role_id = rp.role_id
      WHERE ur.user_id = $1
      ORDER BY p.code ASC
      `, [userId]);
        return rows.map((row) => row.code);
    }
};
exports.AccessControlService = AccessControlService;
exports.AccessControlService = AccessControlService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [typeorm_1.DataSource])
], AccessControlService);
//# sourceMappingURL=access-control.service.js.map