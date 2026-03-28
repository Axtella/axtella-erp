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
const core_1 = require("@nestjs/core");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const orm_config_1 = require("./config/orm.config");
const tenants_module_1 = require("./modules/tenants/tenants.module");
const provisioning_module_1 = require("./modules/provisioning/provisioning.module");
const properties_module_1 = require("./modules/hotel/properties/properties.module");
const room_types_module_1 = require("./modules/hotel/room-types/room-types.module");
const rooms_module_1 = require("./modules/hotel/rooms/rooms.module");
const guests_module_1 = require("./modules/hotel/guests/guests.module");
const reservations_module_1 = require("./modules/hotel/reservations/reservations.module");
const housekeeping_module_1 = require("./modules/hotel/housekeeping/housekeeping.module");
const maintenance_module_1 = require("./modules/hotel/maintenance/maintenance.module");
const folios_module_1 = require("./modules/hotel/folios/folios.module");
const chart_of_accounts_module_1 = require("./modules/accounting/chart-of-accounts/chart-of-accounts.module");
const journals_module_1 = require("./modules/accounting/journals/journals.module");
const receivables_module_1 = require("./modules/accounting/receivables/receivables.module");
const payables_module_1 = require("./modules/accounting/payables/payables.module");
const bank_reconciliation_module_1 = require("./modules/accounting/bank-reconciliation/bank-reconciliation.module");
const vat_module_1 = require("./modules/accounting/vat/vat.module");
const financial_reports_module_1 = require("./modules/accounting/financial-reports/financial-reports.module");
const employees_module_1 = require("./modules/hr/employees/employees.module");
const attendance_module_1 = require("./modules/hr/attendance/attendance.module");
const payroll_module_1 = require("./modules/hr/payroll/payroll.module");
const leave_module_1 = require("./modules/hr/leave/leave.module");
const shifts_module_1 = require("./modules/hr/shifts/shifts.module");
const employee_documents_module_1 = require("./modules/hr/employee-documents/employee-documents.module");
const leads_module_1 = require("./modules/crm/leads/leads.module");
const accounts_module_1 = require("./modules/crm/accounts/accounts.module");
const contacts_module_1 = require("./modules/crm/contacts/contacts.module");
const opportunities_module_1 = require("./modules/crm/opportunities/opportunities.module");
const quotations_module_1 = require("./modules/crm/quotations/quotations.module");
const activities_module_1 = require("./modules/crm/activities/activities.module");
const tasks_module_1 = require("./modules/crm/tasks/tasks.module");
const zatca_module_1 = require("./modules/accounting/zatca/zatca.module");
const access_control_module_1 = require("./modules/access-control/access-control.module");
const auth_module_1 = require("./modules/auth/auth.module");
const jwt_auth_guard_1 = require("./modules/auth/guards/jwt-auth.guard");
const permissions_guard_1 = require("./modules/auth/guards/permissions.guard");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot(orm_config_1.ormConfig),
            tenants_module_1.TenantsModule,
            provisioning_module_1.ProvisioningModule,
            properties_module_1.PropertiesModule,
            room_types_module_1.RoomTypesModule,
            rooms_module_1.RoomsModule,
            guests_module_1.GuestsModule,
            reservations_module_1.ReservationsModule,
            housekeeping_module_1.HousekeepingModule,
            maintenance_module_1.MaintenanceModule,
            folios_module_1.FoliosModule,
            chart_of_accounts_module_1.ChartOfAccountsModule,
            journals_module_1.JournalsModule,
            receivables_module_1.ReceivablesModule,
            payables_module_1.PayablesModule,
            bank_reconciliation_module_1.BankReconciliationModule,
            vat_module_1.VatModule,
            financial_reports_module_1.FinancialReportsModule,
            employees_module_1.EmployeesModule,
            attendance_module_1.AttendanceModule,
            payroll_module_1.PayrollModule,
            leave_module_1.LeaveModule,
            shifts_module_1.ShiftsModule,
            employee_documents_module_1.EmployeeDocumentsModule,
            leads_module_1.LeadsModule,
            accounts_module_1.AccountsModule,
            contacts_module_1.ContactsModule,
            opportunities_module_1.OpportunitiesModule,
            quotations_module_1.QuotationsModule,
            activities_module_1.ActivitiesModule,
            tasks_module_1.TasksModule,
            zatca_module_1.ZatcaModule,
            access_control_module_1.AccessControlModule,
            auth_module_1.AuthModule,
        ],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: jwt_auth_guard_1.JwtAuthGuard,
            },
            {
                provide: core_1.APP_GUARD,
                useClass: permissions_guard_1.PermissionsGuard,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map