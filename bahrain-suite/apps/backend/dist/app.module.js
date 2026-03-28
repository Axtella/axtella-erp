"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const orm_config_1 = require("./config/orm.config");
const app_controller_1 = require("./app.controller");
const health_controller_1 = require("./health/health.controller");
const payroll_module_1 = require("./modules/payroll/payroll.module");
const utilities_module_1 = require("./modules/utilities/utilities.module");
const amc_module_1 = require("./modules/amc/amc.module");
const government_payments_module_1 = require("./modules/government-payments/government-payments.module");
const accounting_module_1 = require("./modules/accounting/accounting.module");
const receivables_aging_module_1 = require("./modules/receivables-aging/receivables-aging.module");
const payables_aging_module_1 = require("./modules/payables-aging/payables-aging.module");
const investor_statements_module_1 = require("./modules/investor-statements/investor-statements.module");
const bank_reconciliation_module_1 = require("./modules/bank-reconciliation/bank-reconciliation.module");
const budget_vs_actual_module_1 = require("./modules/budget-vs-actual/budget-vs-actual.module");
const fixed_assets_module_1 = require("./modules/fixed-assets/fixed-assets.module");
const approvals_module_1 = require("./modules/approvals/approvals.module");
const notifications_module_1 = require("./modules/notifications/notifications.module");
const investors_module_1 = require("./modules/investors/investors.module");
const properties_module_1 = require("./modules/properties/properties.module");
const cost_centers_module_1 = require("./modules/cost-centers/cost-centers.module");
const unit_types_module_1 = require("./modules/unit-types/unit-types.module");
const units_module_1 = require("./modules/units/units.module");
const tenants_module_1 = require("./modules/tenants/tenants.module");
const bookings_module_1 = require("./modules/bookings/bookings.module");
const auth_module_1 = require("./modules/auth/auth.module");
const tax_module_1 = require("./modules/tax/tax.module");
const attendance_module_1 = require("./modules/attendance/attendance.module");
const reports_module_1 = require("./modules/reports/reports.module");
const operating_daybook_module_1 = require("./modules/operating-daybook/operating-daybook.module");
const catalog_items_module_1 = require("./modules/catalog-items/catalog-items.module");
const catalog_item_groups_module_1 = require("./modules/catalog-item-groups/catalog-item-groups.module");
const platform_module_1 = require("./modules/platform/platform.module");
const backbone_module_1 = require("./modules/backbone/backbone.module");
const users_module_1 = require("./modules/users/users.module");
const roles_module_1 = require("./modules/roles/roles.module");
const permissions_module_1 = require("./modules/permissions/permissions.module");
const tenant_settings_module_1 = require("./modules/tenant-settings/tenant-settings.module");
const environments_module_1 = require("./modules/environments/environments.module");
const provisioning_module_1 = require("./modules/provisioning/provisioning.module");
const feature_flags_module_1 = require("./modules/feature-flags/feature-flags.module");
const hotel_module_1 = require("./modules/hotel/hotel.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        controllers: [app_controller_1.AppController, health_controller_1.HealthController],
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot(orm_config_1.ormConfig),
            auth_module_1.AuthModule,
            payroll_module_1.PayrollModule,
            utilities_module_1.UtilitiesModule,
            amc_module_1.AmcModule,
            government_payments_module_1.GovernmentPaymentsModule,
            accounting_module_1.AccountingModule,
            receivables_aging_module_1.ReceivablesAgingModule,
            payables_aging_module_1.PayablesAgingModule,
            investor_statements_module_1.InvestorStatementsModule,
            bank_reconciliation_module_1.BankReconciliationModule,
            budget_vs_actual_module_1.BudgetVsActualModule,
            fixed_assets_module_1.FixedAssetsModule,
            approvals_module_1.ApprovalsModule,
            notifications_module_1.NotificationsModule,
            investors_module_1.InvestorsModule,
            properties_module_1.PropertiesModule,
            cost_centers_module_1.CostCentersModule,
            unit_types_module_1.UnitTypesModule,
            units_module_1.UnitsModule,
            tenants_module_1.TenantsModule,
            bookings_module_1.BookingsModule,
            tax_module_1.TaxModule,
            attendance_module_1.AttendanceModule,
            reports_module_1.ReportsModule,
            operating_daybook_module_1.OperatingDaybookModule,
            catalog_items_module_1.CatalogItemsModule,
            catalog_item_groups_module_1.CatalogItemGroupsModule,
            platform_module_1.PlatformModule,
            backbone_module_1.BackboneModule,
            users_module_1.UsersModule,
            roles_module_1.RolesModule,
            permissions_module_1.PermissionsModule,
            tenant_settings_module_1.TenantSettingsModule,
            environments_module_1.EnvironmentsModule,
            provisioning_module_1.ProvisioningModule,
            feature_flags_module_1.FeatureFlagsModule,
            hotel_module_1.HotelModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map