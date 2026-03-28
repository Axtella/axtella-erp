#!/usr/bin/env python3
import json
import shutil
import textwrap
import zipfile
from pathlib import Path


def write(root: Path, rel_path: str, content: str) -> None:
    path = root / rel_path
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(textwrap.dedent(content).lstrip("\n"), encoding="utf-8")


def scaffold_module(root: Path, base_dir: str, mod: str) -> str:
    class_name = "".join(p.capitalize() for p in mod.replace("-", " ").split())
    write(
        root,
        f"{base_dir}/{mod}/{mod}.service.ts",
        f"""
        import {{ Injectable }} from '@nestjs/common';

        @Injectable()
        export class {class_name}Service {{
          findAll() {{
            return {{ module: '{mod}', items: [] }};
          }}
        }}
        """,
    )
    write(
        root,
        f"{base_dir}/{mod}/{mod}.controller.ts",
        f"""
        import {{ Controller, Get }} from '@nestjs/common';
        import {{ {class_name}Service }} from './{mod}.service';

        @Controller('{base_dir.split("src/modules/")[1]}/{mod}')
        export class {class_name}Controller {{
          constructor(private readonly service: {class_name}Service) {{}}

          @Get()
          findAll() {{
            return this.service.findAll();
          }}
        }}
        """,
    )
    write(
        root,
        f"{base_dir}/{mod}/{mod}.module.ts",
        f"""
        import {{ Module }} from '@nestjs/common';
        import {{ {class_name}Controller }} from './{mod}.controller';
        import {{ {class_name}Service }} from './{mod}.service';

        @Module({{
          controllers: [{class_name}Controller],
          providers: [{class_name}Service],
          exports: [{class_name}Service]
        }})
        export class {class_name}Module {{}}
        """,
    )
    return class_name + "Module"


def main() -> None:
    backend_dir = Path(__file__).resolve().parents[1]
    out_dir = backend_dir / "dist-scaffold"
    root = out_dir / "axtella_global_platform_backend_scaffold"
    zip_path = out_dir / "Axtella_Global_Platform_Backend_Scaffold_ZATCA.zip"

    if root.exists():
        shutil.rmtree(root)
    root.mkdir(parents=True, exist_ok=True)
    out_dir.mkdir(parents=True, exist_ok=True)

    write(
        root,
        "README.md",
        """
        # Axtella Global Platform Backend Scaffold

        NestJS backend scaffold for:
        - Privileged provisioning platform
        - Hotel management
        - Accounting
        - HR
        - CRM
        - International language readiness
        - Saudi ZATCA Phase 2 / FATOORA integration scaffold

        This package is a developer-ready scaffold, not a production-certified compliance solution.
        """,
    )

    write(
        root,
        "package.json",
        """
        {
          "name": "axtella-global-platform-backend",
          "version": "1.0.0",
          "private": true,
          "scripts": {
            "build": "nest build",
            "start": "nest start",
            "start:dev": "nest start --watch",
            "start:prod": "node dist/main"
          },
          "dependencies": {
            "@nestjs/common": "^10.0.0",
            "@nestjs/config": "^3.2.2",
            "@nestjs/core": "^10.0.0",
            "@nestjs/mapped-types": "^2.0.5",
            "@nestjs/platform-express": "^10.0.0",
            "@nestjs/typeorm": "^10.0.2",
            "axios": "^1.7.2",
            "class-transformer": "^0.5.1",
            "class-validator": "^0.14.1",
            "pg": "^8.12.0",
            "reflect-metadata": "^0.2.2",
            "rxjs": "^7.8.1",
            "typeorm": "^0.3.20",
            "xmlbuilder2": "^3.1.1"
          },
          "devDependencies": {
            "@nestjs/cli": "^10.4.2",
            "@types/node": "^20.14.10",
            "ts-node": "^10.9.2",
            "typescript": "^5.5.4"
          }
        }
        """,
    )
    write(root, "nest-cli.json", '{"collection":"@nestjs/schematics","sourceRoot":"src"}')
    write(
        root,
        "tsconfig.json",
        """
        {
          "compilerOptions": {
            "module": "commonjs",
            "declaration": true,
            "removeComments": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "allowSyntheticDefaultImports": true,
            "target": "ES2021",
            "sourceMap": true,
            "outDir": "./dist",
            "baseUrl": "./",
            "incremental": true,
            "skipLibCheck": true,
            "strict": false,
            "moduleResolution": "node",
            "esModuleInterop": true
          },
          "include": ["src/**/*.ts"],
          "exclude": ["node_modules", "dist"]
        }
        """,
    )
    write(
        root,
        "tsconfig.build.json",
        """
        {
          "extends": "./tsconfig.json",
          "exclude": ["node_modules", "dist", "test", "**/*spec.ts"]
        }
        """,
    )
    write(
        root,
        ".env.example",
        """
        PORT=3000
        DB_HOST=localhost
        DB_PORT=5432
        DB_USERNAME=postgres
        DB_PASSWORD=postgres
        DB_NAME=axtella_global_platform
        CORS_ORIGIN=http://localhost:3001
        DEFAULT_LANGUAGE=en
        SUPPORTED_LANGUAGES=en,ar
        SAUDI_ZATCA_ENABLED=true
        ZATCA_ENVIRONMENT=sandbox
        ZATCA_BASE_URL=https://gw-fatoora.zatca.gov.sa
        ZATCA_PORTAL_URL=https://fatoora.zatca.gov.sa
        ZATCA_TIMEOUT_MS=20000
        ZATCA_CSID=
        ZATCA_BINARY_SECURITY_TOKEN=
        ZATCA_SECRET=
        UPLOAD_DIR=uploads
        """,
    )

    write(
        root,
        "src/main.ts",
        """
        import { ValidationPipe } from '@nestjs/common';
        import { NestFactory } from '@nestjs/core';
        import { AppModule } from './app.module';

        async function bootstrap() {
          const app = await NestFactory.create(AppModule);
          app.setGlobalPrefix('api/v1');
          app.enableCors({
            origin: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3001'],
            credentials: true,
          });
          app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
          await app.listen(process.env.PORT || 3000);
        }
        bootstrap();
        """,
    )
    write(
        root,
        "src/common/base/base.entity.ts",
        """
        import { CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

        export abstract class AppBaseEntity {
          @PrimaryGeneratedColumn('uuid')
          id: string;

          @CreateDateColumn({ name: 'created_at' })
          createdAt: Date;

          @UpdateDateColumn({ name: 'updated_at' })
          updatedAt: Date;
        }
        """,
    )
    write(
        root,
        "src/common/base/tenant-aware.entity.ts",
        """
        import { Column } from 'typeorm';
        import { AppBaseEntity } from './base.entity';

        export abstract class TenantAwareEntity extends AppBaseEntity {
          @Column({ name: 'tenant_id', type: 'uuid' })
          tenantId: string;
        }
        """,
    )
    write(
        root,
        "src/config/orm.config.ts",
        """
        import { TypeOrmModuleOptions } from '@nestjs/typeorm';

        export const ormConfig: TypeOrmModuleOptions = {
          type: 'postgres',
          host: process.env.DB_HOST || 'localhost',
          port: Number(process.env.DB_PORT || 5432),
          username: process.env.DB_USERNAME || 'postgres',
          password: process.env.DB_PASSWORD || 'postgres',
          database: process.env.DB_NAME || 'axtella_global_platform',
          autoLoadEntities: true,
          synchronize: false
        };
        """,
    )

    write(
        root,
        "src/modules/tenants/entities/tenant.entity.ts",
        """
        import { Column, Entity } from 'typeorm';
        import { AppBaseEntity } from '../../../common/base/base.entity';

        @Entity({ name: 'tenants' })
        export class Tenant extends AppBaseEntity {
          @Column({ name: 'tenant_code', unique: true, length: 50 })
          tenantCode: string;

          @Column({ name: 'legal_name', length: 200 })
          legalName: string;

          @Column({ name: 'display_name', length: 200 })
          displayName: string;

          @Column({ name: 'country_code', length: 10 })
          countryCode: string;

          @Column({ name: 'currency_code', length: 10, default: 'BHD' })
          currencyCode: string;

          @Column({ name: 'timezone', length: 100 })
          timezone: string;

          @Column({ name: 'status', length: 30, default: 'active' })
          status: string;
        }
        """,
    )
    write(
        root,
        "src/modules/tenants/tenants.service.ts",
        """
        import { Injectable } from '@nestjs/common';

        @Injectable()
        export class TenantsService {
          findAll() {
            return { items: [], total: 0, page: 1, limit: 20 };
          }
        }
        """,
    )
    write(
        root,
        "src/modules/tenants/tenants.controller.ts",
        """
        import { Controller, Get } from '@nestjs/common';
        import { TenantsService } from './tenants.service';

        @Controller('tenants')
        export class TenantsController {
          constructor(private readonly service: TenantsService) {}

          @Get()
          findAll() {
            return this.service.findAll();
          }
        }
        """,
    )
    write(
        root,
        "src/modules/tenants/tenants.module.ts",
        """
        import { Module } from '@nestjs/common';
        import { TenantsController } from './tenants.controller';
        import { TenantsService } from './tenants.service';

        @Module({
          controllers: [TenantsController],
          providers: [TenantsService],
          exports: [TenantsService]
        })
        export class TenantsModule {}
        """,
    )

    write(
        root,
        "src/modules/provisioning/provisioning.service.ts",
        """
        import { Injectable } from '@nestjs/common';

        @Injectable()
        export class ProvisioningService {
          createWorkspace(payload: any) {
            return {
              status: 'queued',
              payload,
              nextSteps: ['create tenant', 'assign modules', 'assign compliance pack', 'assign branding', 'provision environment']
            };
          }
        }
        """,
    )
    write(
        root,
        "src/modules/provisioning/provisioning.controller.ts",
        """
        import { Body, Controller, Post } from '@nestjs/common';
        import { ProvisioningService } from './provisioning.service';

        @Controller('provisioning')
        export class ProvisioningController {
          constructor(private readonly service: ProvisioningService) {}

          @Post('workspace')
          createWorkspace(@Body() payload: any) {
            return this.service.createWorkspace(payload);
          }
        }
        """,
    )
    write(
        root,
        "src/modules/provisioning/provisioning.module.ts",
        """
        import { Module } from '@nestjs/common';
        import { ProvisioningController } from './provisioning.controller';
        import { ProvisioningService } from './provisioning.service';

        @Module({
          controllers: [ProvisioningController],
          providers: [ProvisioningService],
          exports: [ProvisioningService]
        })
        export class ProvisioningModule {}
        """,
    )

    hotel_modules = [
        "properties",
        "room-types",
        "rooms",
        "guests",
        "reservations",
        "housekeeping",
        "maintenance",
        "folios",
    ]
    accounting_modules = [
        "chart-of-accounts",
        "journals",
        "receivables",
        "payables",
        "bank-reconciliation",
        "vat",
        "financial-reports",
    ]
    hr_modules = [
        "employees",
        "attendance",
        "payroll",
        "leave",
        "shifts",
        "employee-documents",
    ]
    crm_modules = [
        "leads",
        "accounts",
        "contacts",
        "opportunities",
        "quotations",
        "activities",
        "tasks",
    ]

    hotel_imports = [scaffold_module(root, "src/modules/hotel", m) for m in hotel_modules]
    acct_imports = [
        scaffold_module(root, "src/modules/accounting", m)
        for m in accounting_modules
    ]
    hr_imports = [scaffold_module(root, "src/modules/hr", m) for m in hr_modules]
    crm_imports = [scaffold_module(root, "src/modules/crm", m) for m in crm_modules]

    write(
        root,
        "src/modules/accounting/zatca/dto/create-zatca-onboarding.dto.ts",
        """
        import { IsOptional, IsString, IsUUID } from 'class-validator';

        export class CreateZatcaOnboardingDto {
          @IsUUID()
          tenantId: string;

          @IsString()
          environment: string;

          @IsOptional()
          @IsString()
          otp?: string;

          @IsOptional()
          @IsString()
          csrPem?: string;
        }
        """,
    )
    write(
        root,
        "src/modules/accounting/zatca/dto/create-zatca-invoice.dto.ts",
        """
        import { IsArray, IsNumber, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';
        import { Type } from 'class-transformer';

        class ZatcaInvoiceLineDto {
          @IsString()
          description: string;

          @IsNumber()
          quantity: number;

          @IsNumber()
          unitPrice: number;

          @IsNumber()
          taxRate: number;
        }

        export class CreateZatcaInvoiceDto {
          @IsUUID()
          tenantId: string;

          @IsString()
          invoiceType: 'standard' | 'simplified';

          @IsString()
          invoiceNumber: string;

          @IsString()
          issueDate: string;

          @IsString()
          issueTime: string;

          @IsString()
          sellerName: string;

          @IsString()
          sellerVatNumber: string;

          @IsOptional()
          @IsString()
          buyerName?: string;

          @IsOptional()
          @IsString()
          buyerVatNumber?: string;

          @IsArray()
          @ValidateNested({ each: true })
          @Type(() => ZatcaInvoiceLineDto)
          lines: ZatcaInvoiceLineDto[];
        }
        """,
    )
    write(
        root,
        "src/modules/accounting/zatca/services/zatca-config.service.ts",
        """
        import { Injectable } from '@nestjs/common';

        @Injectable()
        export class ZatcaConfigService {
          getConfig() {
            return {
              enabled: process.env.SAUDI_ZATCA_ENABLED === 'true',
              environment: process.env.ZATCA_ENVIRONMENT || 'sandbox',
              baseUrl: process.env.ZATCA_BASE_URL || '',
              portalUrl: process.env.ZATCA_PORTAL_URL || '',
              timeoutMs: Number(process.env.ZATCA_TIMEOUT_MS || 20000),
            };
          }
        }
        """,
    )
    write(
        root,
        "src/modules/accounting/zatca/services/zatca-xml-builder.service.ts",
        """
        import { Injectable } from '@nestjs/common';
        import { create } from 'xmlbuilder2';

        @Injectable()
        export class ZatcaXmlBuilderService {
          buildInvoiceXml(payload: any) {
            const total = (payload.lines || []).reduce((sum: number, line: any) => sum + (line.quantity * line.unitPrice), 0);
            const root = create({ version: '1.0', encoding: 'UTF-8' })
              .ele('Invoice')
              .ele('InvoiceNumber').txt(payload.invoiceNumber).up()
              .ele('IssueDate').txt(payload.issueDate).up()
              .ele('IssueTime').txt(payload.issueTime).up()
              .ele('InvoiceType').txt(payload.invoiceType).up()
              .ele('SellerName').txt(payload.sellerName).up()
              .ele('SellerVATNumber').txt(payload.sellerVatNumber).up()
              .ele('TotalAmount').txt(String(total)).up();
            return root.end({ prettyPrint: true });
          }
        }
        """,
    )
    write(
        root,
        "src/modules/accounting/zatca/services/zatca-onboarding.service.ts",
        """
        import { Injectable } from '@nestjs/common';

        @Injectable()
        export class ZatcaOnboardingService {
          async requestOtpFlowHint() {
            return {
              step: 'otp-required',
              message: 'Generate OTP from FATOORA portal and use it within validity window for onboarding flow.'
            };
          }

          async onboard(payload: any) {
            return {
              status: 'scaffolded',
              payload,
              outputs: { preComplianceCsid: null, productionCsid: null }
            };
          }
        }
        """,
    )
    write(
        root,
        "src/modules/accounting/zatca/services/zatca-compliance.service.ts",
        """
        import { Injectable } from '@nestjs/common';

        @Injectable()
        export class ZatcaComplianceService {
          async validateInvoice(xml: string) {
            return {
              status: 'pending-sdk-validation',
              xmlLength: xml.length,
              notes: ['Run official SDK / compliance toolbox validation', 'Map warnings and errors before reporting or clearance']
            };
          }
        }
        """,
    )
    write(
        root,
        "src/modules/accounting/zatca/services/zatca-reporting.service.ts",
        """
        import { Injectable } from '@nestjs/common';

        @Injectable()
        export class ZatcaReportingService {
          async reportSimplifiedInvoice(payload: any) {
            return { status: 'scaffolded', mode: 'reporting', invoiceType: payload.invoiceType };
          }

          async clearStandardInvoice(payload: any) {
            return { status: 'scaffolded', mode: 'clearance', invoiceType: payload.invoiceType };
          }
        }
        """,
    )
    write(
        root,
        "src/modules/accounting/zatca/zatca.controller.ts",
        """
        import { Body, Controller, Get, Post } from '@nestjs/common';
        import { CreateZatcaOnboardingDto } from './dto/create-zatca-onboarding.dto';
        import { CreateZatcaInvoiceDto } from './dto/create-zatca-invoice.dto';
        import { ZatcaConfigService } from './services/zatca-config.service';
        import { ZatcaXmlBuilderService } from './services/zatca-xml-builder.service';
        import { ZatcaOnboardingService } from './services/zatca-onboarding.service';
        import { ZatcaComplianceService } from './services/zatca-compliance.service';
        import { ZatcaReportingService } from './services/zatca-reporting.service';

        @Controller('accounting/zatca')
        export class ZatcaController {
          constructor(
            private readonly configService: ZatcaConfigService,
            private readonly xmlBuilderService: ZatcaXmlBuilderService,
            private readonly onboardingService: ZatcaOnboardingService,
            private readonly complianceService: ZatcaComplianceService,
            private readonly reportingService: ZatcaReportingService,
          ) {}

          @Get('config')
          config() {
            return this.configService.getConfig();
          }

          @Get('onboarding/otp-hint')
          otpHint() {
            return this.onboardingService.requestOtpFlowHint();
          }

          @Post('onboarding')
          onboard(@Body() dto: CreateZatcaOnboardingDto) {
            return this.onboardingService.onboard(dto);
          }

          @Post('invoice/xml')
          buildXml(@Body() dto: CreateZatcaInvoiceDto) {
            const xml = this.xmlBuilderService.buildInvoiceXml(dto);
            return { xml };
          }

          @Post('invoice/compliance')
          async compliance(@Body() dto: CreateZatcaInvoiceDto) {
            const xml = this.xmlBuilderService.buildInvoiceXml(dto);
            return this.complianceService.validateInvoice(xml);
          }

          @Post('invoice/report')
          report(@Body() dto: CreateZatcaInvoiceDto) {
            return this.reportingService.reportSimplifiedInvoice(dto);
          }

          @Post('invoice/clear')
          clear(@Body() dto: CreateZatcaInvoiceDto) {
            return this.reportingService.clearStandardInvoice(dto);
          }
        }
        """,
    )
    write(
        root,
        "src/modules/accounting/zatca/zatca.module.ts",
        """
        import { Module } from '@nestjs/common';
        import { ZatcaController } from './zatca.controller';
        import { ZatcaConfigService } from './services/zatca-config.service';
        import { ZatcaXmlBuilderService } from './services/zatca-xml-builder.service';
        import { ZatcaOnboardingService } from './services/zatca-onboarding.service';
        import { ZatcaComplianceService } from './services/zatca-compliance.service';
        import { ZatcaReportingService } from './services/zatca-reporting.service';

        @Module({
          controllers: [ZatcaController],
          providers: [ZatcaConfigService, ZatcaXmlBuilderService, ZatcaOnboardingService, ZatcaComplianceService, ZatcaReportingService],
          exports: [ZatcaConfigService, ZatcaXmlBuilderService, ZatcaOnboardingService, ZatcaComplianceService, ZatcaReportingService]
        })
        export class ZatcaModule {}
        """,
    )

    write(
        root,
        "docs/saudi-zatca-fatoora-integration-notes.md",
        """
        # Saudi ZATCA Phase 2 / FATOORA Integration Notes

        Scaffold coverage:
        - onboarding workflow placeholder
        - OTP-oriented onboarding hint flow
        - XML invoice builder placeholder
        - compliance validation adapter placeholder
        - reporting / clearance route split
        - environment-based config
        - multilingual invoice metadata readiness
        - VAT / tax engine extension points

        Still required before production:
        - production onboarding using official credentials and device flow
        - official SDK / compliance toolbox validation step
        - cryptographic stamp / certificate handling
        - QR / hash / signature / UBL completion
        - PDF/A-3 with embedded XML workflow if required
        - Arabic invoice field validation
        - taxpayer wave readiness and full end-to-end testing
        """,
    )

    write(
        root,
        "src/database/migrations/100_create_zatca_config_tables.sql",
        """
        CREATE EXTENSION IF NOT EXISTS "pgcrypto";

        CREATE TABLE IF NOT EXISTS zatca_settings (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            tenant_id UUID NOT NULL,
            environment VARCHAR(30) NOT NULL DEFAULT 'sandbox',
            seller_vat_number VARCHAR(50),
            branch_name_ar VARCHAR(200),
            branch_name_en VARCHAR(200),
            branch_address_ar TEXT,
            branch_address_en TEXT,
            csr_pem TEXT,
            csid TEXT,
            binary_security_token TEXT,
            secret TEXT,
            is_active BOOLEAN NOT NULL DEFAULT TRUE,
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS zatca_invoice_logs (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            tenant_id UUID NOT NULL,
            invoice_no VARCHAR(100) NOT NULL,
            invoice_type VARCHAR(30) NOT NULL,
            clearance_mode VARCHAR(30) NOT NULL,
            request_payload JSONB,
            response_payload JSONB,
            status VARCHAR(30) NOT NULL DEFAULT 'draft',
            created_at TIMESTAMP NOT NULL DEFAULT NOW(),
            updated_at TIMESTAMP NOT NULL DEFAULT NOW()
        );
        """,
    )

    imports = [
        "import { Module } from '@nestjs/common';",
        "import { ConfigModule } from '@nestjs/config';",
        "import { TypeOrmModule } from '@nestjs/typeorm';",
        "import { ormConfig } from './config/orm.config';",
        "import { TenantsModule } from './modules/tenants/tenants.module';",
        "import { ProvisioningModule } from './modules/provisioning/provisioning.module';",
    ]
    module_refs = ["TenantsModule", "ProvisioningModule"]

    for group, mods in [
        ("hotel", hotel_modules),
        ("accounting", accounting_modules),
        ("hr", hr_modules),
        ("crm", crm_modules),
    ]:
        for mod in mods:
            class_name = "".join(p.capitalize() for p in mod.replace("-", " ").split()) + "Module"
            imports.append(
                f"import {{ {class_name} }} from './modules/{group}/{mod}/{mod}.module';"
            )
            module_refs.append(class_name)

    imports.append(
        "import { ZatcaModule } from './modules/accounting/zatca/zatca.module';"
    )
    module_refs.append("ZatcaModule")

    write(
        root,
        "src/app.module.ts",
        "\n".join(imports)
        + "\n\n@Module({\n  imports: [\n    ConfigModule.forRoot({ isGlobal: true }),\n    TypeOrmModule.forRoot(ormConfig),\n"
        + "".join(f"    {m},\n" for m in module_refs)
        + "  ],\n})\nexport class AppModule {}\n",
    )

    if zip_path.exists():
        zip_path.unlink()
    with zipfile.ZipFile(zip_path, "w", zipfile.ZIP_DEFLATED) as zf:
        for p in root.rglob("*"):
            if p.is_file():
                zf.write(p, p.relative_to(root))

    manifest = {
        "scaffold_dir": str(root),
        "zip_file": str(zip_path),
    }
    (out_dir / "scaffold-manifest.json").write_text(
        json.dumps(manifest, indent=2), encoding="utf-8"
    )
    print(str(zip_path))


if __name__ == "__main__":
    main()
