import { PropertiesRegistry } from '../properties/PropertiesRegistry';
import {
  GenericModuleRegistry,
  type GenericModuleRegistryProps,
} from './GenericModuleRegistry';
import { JournalsModuleRegistry } from './JournalsModuleRegistry';
import { PnlMonthlyRegistry } from './PnlMonthlyRegistry';
import { StubModuleRegistry } from './StubModuleRegistry';
import { StructuredObjectRegistry } from './StructuredObjectRegistry';
import {
  endpointPath,
  extractListPayload,
  isJournalListPayload,
  isMonthlyPnlPayload,
  isStubModulePayload,
} from './listPayload';

const GENERIC_REGISTRY: Record<
  string,
  Omit<GenericModuleRegistryProps, 'data' | 'expectedEndpoint'>
> = {
  '/tenants': {
    registerTitle: 'Tenant register',
    registerSubtitle:
      'Master tenant records for occupancy, contracts, and compliance.',
    entityLabel: 'tenant',
    midKpi: (items) => ({
      label: 'Types in view',
      value: new Set(items.map((i) => String(i.tenantType ?? ''))).size,
    }),
    columns: [
      { key: 'fullName', label: 'Name' },
      { key: 'tenantType', label: 'Type', format: 'pill' },
      { key: 'phone', label: 'Phone' },
      { key: 'email', label: 'Email', format: 'truncate' },
      { key: 'nationality', label: 'Nationality' },
    ],
  },
  '/bookings': {
    rowPropertyIdKey: 'propertyId',
    registerTitle: 'Booking register',
    registerSubtitle:
      'Occupancy and lease lines by property, unit, and tenant—aligned with a rent roll / booking sheet.',
    entityLabel: 'booking',
    midKpi: (items) => ({
      label: 'Active (reserved + in)',
      value: items.filter((i) =>
        ['reserved', 'checked_in'].includes(String(i.status ?? '')),
      ).length,
    }),
    columns: [
      { key: 'propertyName', label: 'Property' },
      { key: 'propertyCode', label: 'Code', format: 'code' },
      { key: 'unitNo', label: 'Unit' },
      { key: 'unitTypeName', label: 'Unit type' },
      { key: 'tenantName', label: 'Tenant' },
      { key: 'tenantPhone', label: 'Phone' },
      { key: 'tenantCpr', label: 'CPR' },
      { key: 'bookingType', label: 'Contract', format: 'pill' },
      { key: 'status', label: 'Status', format: 'pill' },
      { key: 'checkInDate', label: 'Check-in', format: 'datetime' },
      { key: 'checkOutDate', label: 'Check-out', format: 'datetime' },
      { key: 'contractStartDate', label: 'Contract from', format: 'date' },
      { key: 'contractEndDate', label: 'Contract to', format: 'date' },
      {
        key: 'rateMonthly',
        label: 'Rent / mo',
        format: 'currency',
        align: 'right',
      },
      {
        key: 'rateDaily',
        label: 'Daily',
        format: 'currency',
        align: 'right',
      },
      {
        key: 'depositAmount',
        label: 'Deposit',
        format: 'currency',
        align: 'right',
      },
      { key: 'notes', label: 'Notes', format: 'truncate' },
    ],
  },
  '/operating-daybook': {
    rowPropertyIdKey: 'propertyId',
    registerTitle: 'Operating daybook',
    registerSubtitle:
      'Property-level cash book: income, expense, and salary lines with debit and credit.',
    entityLabel: 'line',
    midKpi: (items) => ({
      label: 'With voucher no.',
      value: items.filter((i) => String(i.voucherNo ?? '').trim().length > 0)
        .length,
    }),
    columns: [
      { key: 'entryDate', label: 'Date', format: 'date' },
      { key: 'propertyName', label: 'Property' },
      { key: 'voucherNo', label: 'Voucher' },
      { key: 'accountCategory', label: 'Category', format: 'pill' },
      { key: 'description', label: 'Description', format: 'truncate' },
      { key: 'reference', label: 'Reference', format: 'truncate' },
      { key: 'paymentChannel', label: 'Cash / Bank' },
      {
        key: 'debit',
        label: 'Debit',
        format: 'currency',
        align: 'right',
      },
      {
        key: 'credit',
        label: 'Credit',
        format: 'currency',
        align: 'right',
      },
      { key: 'approved', label: 'Approved', format: 'pill' },
    ],
  },
  '/catalog-item-groups': {
    registerTitle: 'Item groups',
    registerSubtitle:
      'Categories for catalog lines: occupancy, fees, utilities recovery, and custom segments.',
    entityLabel: 'group',
    midKpi: (items) => ({
      label: 'Active',
      value: items.filter((i) => i.isActive !== false).length,
    }),
    columns: [
      { key: 'code', label: 'Code', format: 'code' },
      { key: 'name', label: 'Name' },
      { key: 'sortOrder', label: 'Sort', align: 'right' },
      { key: 'isActive', label: 'Active', format: 'pill' },
      { key: 'notes', label: 'Notes', format: 'truncate' },
      { key: 'createdAt', label: 'Created', format: 'datetime' },
    ],
  },
  '/catalog-items': {
    registerTitle: 'Catalog register',
    registerSubtitle:
      'Billable products and services: rent lines, fees, recoveries, and metered charges.',
    entityLabel: 'item',
    midKpi: (items) => ({
      label: 'Active',
      value: items.filter((i) => i.isActive !== false).length,
    }),
    columns: [
      { key: 'code', label: 'Code', format: 'code' },
      { key: 'name', label: 'Name' },
      { key: 'groupName', label: 'Group' },
      { key: 'itemType', label: 'Type', format: 'pill' },
      { key: 'unitOfMeasure', label: 'UoM' },
      {
        key: 'defaultPrice',
        label: 'Default price',
        format: 'currency',
        align: 'right',
      },
      { key: 'isActive', label: 'Active', format: 'pill' },
      { key: 'notes', label: 'Notes', format: 'truncate' },
      { key: 'createdAt', label: 'Created', format: 'datetime' },
    ],
  },
  '/attendance': {
    registerTitle: 'Attendance register',
    registerSubtitle: 'Clock events and daily status by employee.',
    entityLabel: 'record',
    midKpi: (items) => ({
      label: 'Present',
      value: items.filter(
        (i) => String(i.status ?? '').toLowerCase() === 'present',
      ).length,
    }),
    columns: [
      { key: 'employeeCode', label: 'Code', format: 'code' },
      { key: 'employeeName', label: 'Name' },
      { key: 'workDate', label: 'Date', format: 'date' },
      { key: 'clockIn', label: 'In' },
      { key: 'clockOut', label: 'Out' },
      { key: 'status', label: 'Status', format: 'pill' },
    ],
  },
};

function isJournalsListPath(path: string): boolean {
  return path === '/accounting/journals' || path === '/accounting/journals/daybook';
}

function buildAutoListRegistry(
  path: string,
  items: Record<string, unknown>[],
): Omit<GenericModuleRegistryProps, 'data'> {
  const sample = items[0];
  const keys = sample
    ? Object.keys(sample).filter((k) => k !== 'lines' && !k.startsWith('_'))
    : [];
  const take = keys.slice(0, 12);
  return {
    registerTitle: 'Data register',
    registerSubtitle: `Automatic columns for ${path}`,
    entityLabel: 'row',
    columns: take.map((key) => ({
      key,
      label: key
        .replace(/([A-Z])/g, ' $1')
        .replace(/_/g, ' ')
        .trim()
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      format:
        key.toLowerCase().includes('amount') ||
        key.toLowerCase().includes('rate') ||
        key.toLowerCase().includes('price')
          ? ('currency' as const)
          : key.toLowerCase().endsWith('id') && key.length > 2
            ? ('uuid' as const)
            : undefined,
      align:
        key.toLowerCase().includes('amount') ||
        key.toLowerCase().includes('rate')
          ? ('right' as const)
          : undefined,
    })),
    expectedEndpoint: path,
  };
}

export function AdaptiveModuleRegistry({
  endpoint,
  data,
}: {
  endpoint: string;
  data: unknown;
}) {
  const path = endpointPath(endpoint);

  if (path === '/properties') {
    return <PropertiesRegistry data={data} />;
  }

  if (path.startsWith('/accounting/pnl/monthly') && isMonthlyPnlPayload(data)) {
    return <PnlMonthlyRegistry data={data} />;
  }

  if (isJournalsListPath(path) && isJournalListPayload(data)) {
    return <JournalsModuleRegistry data={data} />;
  }

  const configured = GENERIC_REGISTRY[path];
  if (configured) {
    return (
      <GenericModuleRegistry
        {...configured}
        data={data}
        expectedEndpoint={path}
      />
    );
  }

  if (isStubModulePayload(data)) {
    return <StubModuleRegistry data={data} />;
  }

  const list = extractListPayload(data);
  if (list) {
    const auto = buildAutoListRegistry(path, list.items);
    const first = list.items[0] as Record<string, unknown> | undefined;
    const rowPropertyIdKey =
      first && typeof first.propertyId === 'string' && first.propertyId
        ? 'propertyId'
        : undefined;
    return (
      <GenericModuleRegistry
        {...auto}
        data={data}
        rowPropertyIdKey={rowPropertyIdKey}
      />
    );
  }

  return <StructuredObjectRegistry data={data} />;
}
