import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/orm.config';
import { TenantsModule } from './modules/tenants/tenants.module';
import { ProvisioningModule } from './modules/provisioning/provisioning.module';
import { PropertiesModule } from './modules/hotel/properties/properties.module';
import { RoomTypesModule } from './modules/hotel/room-types/room-types.module';
import { RoomsModule } from './modules/hotel/rooms/rooms.module';
import { GuestsModule } from './modules/hotel/guests/guests.module';
import { ReservationsModule } from './modules/hotel/reservations/reservations.module';
import { HousekeepingModule } from './modules/hotel/housekeeping/housekeeping.module';
import { MaintenanceModule } from './modules/hotel/maintenance/maintenance.module';
import { FoliosModule } from './modules/hotel/folios/folios.module';
import { ChartOfAccountsModule } from './modules/accounting/chart-of-accounts/chart-of-accounts.module';
import { JournalsModule } from './modules/accounting/journals/journals.module';
import { ReceivablesModule } from './modules/accounting/receivables/receivables.module';
import { PayablesModule } from './modules/accounting/payables/payables.module';
import { BankReconciliationModule } from './modules/accounting/bank-reconciliation/bank-reconciliation.module';
import { VatModule } from './modules/accounting/vat/vat.module';
import { FinancialReportsModule } from './modules/accounting/financial-reports/financial-reports.module';
import { EmployeesModule } from './modules/hr/employees/employees.module';
import { AttendanceModule } from './modules/hr/attendance/attendance.module';
import { PayrollModule } from './modules/hr/payroll/payroll.module';
import { LeaveModule } from './modules/hr/leave/leave.module';
import { ShiftsModule } from './modules/hr/shifts/shifts.module';
import { EmployeeDocumentsModule } from './modules/hr/employee-documents/employee-documents.module';
import { LeadsModule } from './modules/crm/leads/leads.module';
import { AccountsModule } from './modules/crm/accounts/accounts.module';
import { ContactsModule } from './modules/crm/contacts/contacts.module';
import { OpportunitiesModule } from './modules/crm/opportunities/opportunities.module';
import { QuotationsModule } from './modules/crm/quotations/quotations.module';
import { ActivitiesModule } from './modules/crm/activities/activities.module';
import { TasksModule } from './modules/crm/tasks/tasks.module';
import { ZatcaModule } from './modules/accounting/zatca/zatca.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormConfig),
    TenantsModule,
    ProvisioningModule,
    PropertiesModule,
    RoomTypesModule,
    RoomsModule,
    GuestsModule,
    ReservationsModule,
    HousekeepingModule,
    MaintenanceModule,
    FoliosModule,
    ChartOfAccountsModule,
    JournalsModule,
    ReceivablesModule,
    PayablesModule,
    BankReconciliationModule,
    VatModule,
    FinancialReportsModule,
    EmployeesModule,
    AttendanceModule,
    PayrollModule,
    LeaveModule,
    ShiftsModule,
    EmployeeDocumentsModule,
    LeadsModule,
    AccountsModule,
    ContactsModule,
    OpportunitiesModule,
    QuotationsModule,
    ActivitiesModule,
    TasksModule,
    ZatcaModule,
  ],
})
export class AppModule {}
