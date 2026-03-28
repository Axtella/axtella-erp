import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ormConfig } from './config/orm.config';
import { AppController } from './app.controller';
import { HealthController } from './health/health.controller';
import { PayrollModule } from './modules/payroll/payroll.module';
import { UtilitiesModule } from './modules/utilities/utilities.module';
import { AmcModule } from './modules/amc/amc.module';
import { GovernmentPaymentsModule } from './modules/government-payments/government-payments.module';
import { AccountingModule } from './modules/accounting/accounting.module';
import { ReceivablesAgingModule } from './modules/receivables-aging/receivables-aging.module';
import { PayablesAgingModule } from './modules/payables-aging/payables-aging.module';
import { InvestorStatementsModule } from './modules/investor-statements/investor-statements.module';
import { BankReconciliationModule } from './modules/bank-reconciliation/bank-reconciliation.module';
import { BudgetVsActualModule } from './modules/budget-vs-actual/budget-vs-actual.module';
import { FixedAssetsModule } from './modules/fixed-assets/fixed-assets.module';
import { ApprovalsModule } from './modules/approvals/approvals.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { InvestorsModule } from './modules/investors/investors.module';
import { PropertiesModule } from './modules/properties/properties.module';
import { CostCentersModule } from './modules/cost-centers/cost-centers.module';
import { UnitTypesModule } from './modules/unit-types/unit-types.module';
import { UnitsModule } from './modules/units/units.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { BookingsModule } from './modules/bookings/bookings.module';
import { AuthModule } from './modules/auth/auth.module';
import { TaxModule } from './modules/tax/tax.module';
import { AttendanceModule } from './modules/attendance/attendance.module';
import { ReportsModule } from './modules/reports/reports.module';
import { OperatingDaybookModule } from './modules/operating-daybook/operating-daybook.module';
import { CatalogItemsModule } from './modules/catalog-items/catalog-items.module';
import { CatalogItemGroupsModule } from './modules/catalog-item-groups/catalog-item-groups.module';
import { PlatformModule } from './modules/platform/platform.module';
import { BackboneModule } from './modules/backbone/backbone.module';
import { UsersModule } from './modules/users/users.module';
import { RolesModule } from './modules/roles/roles.module';
import { PermissionsModule } from './modules/permissions/permissions.module';
import { TenantSettingsModule } from './modules/tenant-settings/tenant-settings.module';
import { EnvironmentsModule } from './modules/environments/environments.module';
import { ProvisioningModule } from './modules/provisioning/provisioning.module';
import { FeatureFlagsModule } from './modules/feature-flags/feature-flags.module';
import { HotelModule } from './modules/hotel/hotel.module';

@Module({
  controllers: [AppController, HealthController],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(ormConfig),
    AuthModule,
    PayrollModule,
    UtilitiesModule,
    AmcModule,
    GovernmentPaymentsModule,
    AccountingModule,
    ReceivablesAgingModule,
    PayablesAgingModule,
    InvestorStatementsModule,
    BankReconciliationModule,
    BudgetVsActualModule,
    FixedAssetsModule,
    ApprovalsModule,
    NotificationsModule,
    InvestorsModule,
    PropertiesModule,
    CostCentersModule,
    UnitTypesModule,
    UnitsModule,
    TenantsModule,
    BookingsModule,
    TaxModule,
    AttendanceModule,
    ReportsModule,
    OperatingDaybookModule,
    CatalogItemsModule,
    CatalogItemGroupsModule,
    PlatformModule,
    BackboneModule,
    UsersModule,
    RolesModule,
    PermissionsModule,
    TenantSettingsModule,
    EnvironmentsModule,
    ProvisioningModule,
    FeatureFlagsModule,
    HotelModule,
  ],
})
export class AppModule {}
