'use client';

import { ModuleDataPage } from '../ModuleDataPage';

export function OperationsDaybookPage() {
  return (
    <div className="page-container">
      <ModuleDataPage
        title="Property operating daybook"
        badge="Cash book"
        endpoint="/operating-daybook?limit=100"
        description="Voucher-style lines per property: income, expense, and salary with debit / credit, payment channel, and references. Pick the building in the top bar Property control (or All properties). Separate from Accounting → Daybook (general ledger)."
      />
    </div>
  );
}
