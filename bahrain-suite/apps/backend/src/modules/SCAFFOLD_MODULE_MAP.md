# Full Module Map

This map aligns with the requested full NestJS scaffold.

## Platform core

`auth`, `users`, `roles`, `permissions`, `tenants`, `tenant-settings`,
`environments`, `provisioning`, `subscriptions`, `branding`, `compliance`,
`country-packs`, `feature-flags`, `notifications`, `approvals`, `audit`,
`files`, `templates`, `support`, `dashboard`.

## Hotel management

`hotel/properties`, `hotel/property-blocks`, `hotel/floors`, `hotel/room-types`,
`hotel/rooms`, `hotel/rate-plans`, `hotel/seasons`, `hotel/guests`,
`hotel/reservations`, `hotel/checkin`, `hotel/checkout`, `hotel/folios`,
`hotel/room-charges`, `hotel/housekeeping`, `hotel/maintenance`,
`hotel/frontdesk`, `hotel/occupancy`.

## Accounting

`accounting/chart-of-accounts`, `accounting/journals`,
`accounting/receivables`, `accounting/payables`, `accounting/bank-accounts`,
`accounting/bank-reconciliation`, `accounting/tax`, `accounting/vat`,
`accounting/zatca`, `accounting/budgets`, `accounting/fixed-assets`,
`accounting/allocations`, `accounting/financial-reports`,
`accounting/fiscal-periods`, `accounting/closing`.

## HR

`hr/departments`, `hr/designations`, `hr/employees`, `hr/contracts`,
`hr/attendance`, `hr/shifts`, `hr/leave`, `hr/payroll`,
`hr/payroll-components`, `hr/benefits`, `hr/deductions`,
`hr/employee-documents`, `hr/compliance-tracking`.

## CRM

`crm/leads`, `crm/accounts`, `crm/contacts`, `crm/opportunities`,
`crm/quotations`, `crm/activities`, `crm/tasks`, `crm/pipelines`,
`crm/campaigns`, `crm/support-handover`.

## Integrations

`integrations/email`, `integrations/sms`, `integrations/whatsapp`,
`integrations/payment-gateways`, `integrations/maps`,
`integrations/storage`, `integrations/webhooks`.

## Standard module pattern

Each module should follow:

```text
module-name/
  dto/
    create-*.dto.ts
    update-*.dto.ts
    find-*.dto.ts
  entities/
    *.entity.ts
  *.controller.ts
  *.service.ts
  *.module.ts
```
