import {
  canAccessAccountantNav,
  canAccessAdmin,
  canAccessDeveloper,
  canAccessPayroll,
} from './rbac';

export type NavGate = 'payroll' | 'admin' | 'developer' | 'accountant';

export type NavBadgeKind = 'live' | 'soon';

export interface NavNode {
  id: string;
  label: string;
  href?: string;
  children?: NavNode[];
  gate?: NavGate;
  /** Sidebar hint: `soon` = placeholder UI; `live` = data-backed in typical setups. */
  navBadge?: NavBadgeKind;
}

/**
 * Axtella property + finance IA. Order: portfolio → commercial flows → accounting → reporting → platform.
 * Route `href`s are stable; only labels/grouping reflect this product (not a third-party ERP shell).
 */
export const NAV_TREE: NavNode[] = [
  { id: 'home', label: 'Home', href: '/' },
  {
    id: 'portfolio',
    label: 'Portfolio operations',
    children: [
      { id: 'prop', label: 'Properties', href: '/properties' },
      { id: 'book', label: 'Bookings', href: '/bookings' },
      {
        id: 'op-daybook',
        label: 'Property daybook',
        href: '/operations/daybook',
      },
      { id: 'util', label: 'Utilities', href: '/utilities' },
      { id: 'amc', label: 'AMC', href: '/amc' },
      {
        id: 'gov',
        label: 'Government payments',
        href: '/government-payments',
      },
      {
        id: 'inv-st',
        label: 'Investor statements',
        href: '/investor-statements',
      },
      { id: 'notif', label: 'Notifications', href: '/notifications' },
    ],
  },
  {
    id: 'catalog',
    label: 'Services & catalog',
    children: [
      {
        id: 'items-list',
        label: 'Catalog items',
        href: '/items',
        navBadge: 'live',
      },
      {
        id: 'items-groups',
        label: 'Groups',
        href: '/items/groups',
        navBadge: 'live',
      },
      {
        id: 'items-prices',
        label: 'Price lists',
        href: '/items/price-lists',
        navBadge: 'soon',
      },
    ],
  },
  {
    id: 'inventory',
    label: 'Stock & materials',
    children: [
      { id: 'inv-root', label: 'Overview', href: '/inventory', navBadge: 'soon' },
      {
        id: 'inv-adj',
        label: 'Adjustments',
        href: '/inventory/adjustments',
        navBadge: 'soon',
      },
      {
        id: 'inv-trans',
        label: 'Transfers',
        href: '/inventory/transfers',
        navBadge: 'soon',
      },
    ],
  },
  {
    id: 'revenue',
    label: 'Revenue & collections',
    children: [
      { id: 'sales-customers', label: 'Tenants', href: '/tenants' },
      {
        id: 'sales-quotes',
        label: 'Quotes',
        href: '/sales/quotes',
        navBadge: 'soon',
      },
      {
        id: 'sales-invoices',
        label: 'Invoices',
        href: '/sales/invoices',
        navBadge: 'soon',
      },
      {
        id: 'sales-pay',
        label: 'Collections & receipts',
        href: '/sales/payments-received',
        navBadge: 'soon',
      },
      {
        id: 'sales-rec',
        label: 'Recurring billing',
        href: '/sales/recurring-invoices',
        navBadge: 'soon',
      },
      {
        id: 'sales-orders',
        label: 'Orders',
        href: '/sales/orders',
        navBadge: 'soon',
      },
    ],
  },
  {
    id: 'payables',
    label: 'Payables & spend',
    children: [
      {
        id: 'pur-vend',
        label: 'Vendors',
        href: '/purchases/vendors',
        navBadge: 'soon',
      },
      {
        id: 'pur-exp',
        label: 'Operating expenses',
        href: '/purchases/expenses',
        navBadge: 'soon',
      },
      {
        id: 'pur-bills',
        label: 'Bills',
        href: '/purchases/bills',
        navBadge: 'soon',
      },
      {
        id: 'pur-pay',
        label: 'Payments out',
        href: '/purchases/payments-made',
        navBadge: 'soon',
      },
    ],
  },
  {
    id: 'time',
    label: 'Time & attendance',
    children: [
      { id: 'time-att', label: 'Attendance', href: '/attendance' },
      {
        id: 'time-proj',
        label: 'Projects',
        href: '/time/projects',
        navBadge: 'soon',
      },
    ],
  },
  { id: 'banking', label: 'Banking & reconciliation', href: '/bank-reconciliation' },
  {
    id: 'accountant',
    label: 'Accounting',
    gate: 'accountant',
    children: [
      {
        id: 'acc-ledger',
        label: 'General ledger',
        children: [
          {
            id: 'acc-journals',
            label: 'Journal entries',
            href: '/accounting/journals',
          },
          {
            id: 'acc-daybook',
            label: 'Daybook',
            href: '/accounting/daybook',
          },
          {
            id: 'acc-tb',
            label: 'Trial balance',
            href: '/accounting/trial-balance',
          },
          {
            id: 'acc-coa',
            label: 'Chart of accounts',
            href: '/accounting/chart-of-accounts',
          },
        ],
      },
      {
        id: 'acc-mgmt',
        label: 'Management & assets',
        children: [
          {
            id: 'acc-pnl',
            label: 'Monthly P&L',
            href: '/accounting/pnl',
          },
          {
            id: 'acc-bud',
            label: 'Budget vs actual',
            href: '/budget-vs-actual',
          },
          { id: 'acc-fa', label: 'Fixed assets', href: '/fixed-assets' },
        ],
      },
    ],
  },
  {
    id: 'reports',
    label: 'Reports & analytics',
    children: [
      { id: 'rep-hub', label: 'Reports home', href: '/reports' },
      {
        id: 'rep-fin',
        label: 'Financial reports',
        children: [
          {
            id: 'rep-ie',
            label: 'Income & expense',
            href: '/reports/income-expense',
          },
          { id: 'rep-pnl', label: 'Profit & loss', href: '/accounting/pnl' },
          {
            id: 'rep-bus',
            label: 'Business overview',
            href: '/reports/business-overview',
            navBadge: 'soon',
          },
        ],
      },
      {
        id: 'rep-arap',
        label: 'Aging & tax',
        children: [
          {
            id: 'rep-rec',
            label: 'Receivables aging',
            href: '/receivables-aging',
          },
          {
            id: 'rep-pay',
            label: 'Payables aging',
            href: '/payables-aging',
          },
          { id: 'rep-vat', label: 'Bahrain VAT (10%)', href: '/tools/vat' },
        ],
      },
    ],
  },
  { id: 'documents', label: 'Documents', href: '/documents', navBadge: 'soon' },
  {
    id: 'finance',
    label: 'Payroll',
    gate: 'payroll',
    children: [{ id: 'pay', label: 'Payroll runs', href: '/payroll' }],
  },
  {
    id: 'data',
    label: 'Data management',
    children: [
      { id: 'bulk', label: 'Bulk import', href: '/data-import' },
      {
        id: 'brand-showcase',
        label: 'Axtella brand showcase',
        href: '/tools/axtella-branding',
      },
    ],
  },
  {
    id: 'roles',
    label: 'Role workspaces',
    children: [
      {
        id: 'adm',
        label: 'Admin',
        href: '/admin',
        gate: 'admin',
        navBadge: 'soon',
      },
      { id: 'hr', label: 'HR', href: '/hr', gate: 'payroll', navBadge: 'soon' },
      {
        id: 'dev',
        label: 'Developer',
        href: '/developer',
        gate: 'developer',
        navBadge: 'soon',
      },
    ],
  },
  { id: 'control', label: 'Approvals', href: '/approvals' },
];

function gateOk(gate: NavGate | undefined, role: string | null): boolean {
  if (!gate) return true;
  if (gate === 'payroll') return canAccessPayroll(role);
  if (gate === 'admin') return canAccessAdmin(role);
  if (gate === 'developer') return canAccessDeveloper(role);
  if (gate === 'accountant') return canAccessAccountantNav(role);
  return true;
}

function filterNav(nodes: NavNode[], role: string | null): NavNode[] {
  const out: NavNode[] = [];
  for (const n of nodes) {
    if (!gateOk(n.gate, role)) continue;
    const kids = n.children?.length
      ? filterNav(n.children, role)
      : undefined;
    if (n.children?.length && (!kids || kids.length === 0)) continue;
    out.push({
      ...n,
      children: kids?.length ? kids : undefined,
    });
  }
  return out;
}

export function getVisibleNav(role: string | null): NavNode[] {
  return filterNav(NAV_TREE, role);
}

export function collectNavLabels(
  nodes: NavNode[],
  acc: Record<string, string> = {},
): Record<string, string> {
  for (const n of nodes) {
    if (n.href) acc[n.href] = n.label;
    if (n.children) collectNavLabels(n.children, acc);
  }
  return acc;
}

export function branchActive(node: NavNode, pathname: string): boolean {
  if (node.href) {
    if (node.href === '/') return pathname === '/';
    if (pathname === node.href || pathname.startsWith(`${node.href}/`)) {
      return true;
    }
  }
  return node.children?.some((c) => branchActive(c, pathname)) ?? false;
}
