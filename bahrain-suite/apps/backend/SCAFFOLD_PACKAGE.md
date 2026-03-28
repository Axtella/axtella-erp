# Backend Scaffold Package

This folder is prepared as a zip-ready NestJS scaffold for:

- Privileged provisioning platform
- Hotel/property operations
- Accounting/finance
- HR/payroll
- CRM
- Multilingual readiness

## Package command

Run from repository root:

```bash
bash "apps/backend/scripts/package-backend-scaffold.sh"
```

This generates:

- `apps/backend/dist-scaffold/backend-scaffold.zip`

## Included in package

- `apps/backend/src/common` shared scaffold files
- `apps/backend/src/config` scaffold configs
- `apps/backend/src/i18n` locale packs (`en`, `ar`)
- `apps/backend/src/modules/backbone` phase orchestrator modules
- existing backend runtime files (`main.ts`, `app.module.ts`, etc.)
