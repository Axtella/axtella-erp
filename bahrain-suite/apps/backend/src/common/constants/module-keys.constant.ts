export const MODULE_KEYS = [
  'platform',
  'hotel',
  'accounting',
  'hr',
  'crm',
  'integrations',
] as const;

export type ModuleKey = (typeof MODULE_KEYS)[number];
