'use client';

import { ModuleDataPage } from '../ModuleDataPage';

export function CatalogItemsHub() {
  return (
    <ModuleDataPage
      title="Catalog items"
      badge="Services & catalog"
      endpoint="/catalog-items?limit=100&page=1"
      description="Product and service lines for rent components, common charges, utilities recovery, and other billable items. Assign groups under Item groups; price lists are next."
      applyPropertyScope={false}
    />
  );
}
