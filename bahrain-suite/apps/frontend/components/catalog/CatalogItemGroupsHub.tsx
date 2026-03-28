'use client';

import { ModuleDataPage } from '../ModuleDataPage';

export function CatalogItemGroupsHub() {
  return (
    <ModuleDataPage
      title="Item groups"
      badge="Services & catalog"
      endpoint="/catalog-item-groups?limit=100&page=1"
      description="Group catalog items for pricing, reporting, and POS-style categories. Items on the catalog screen can reference a group."
      applyPropertyScope={false}
    />
  );
}
