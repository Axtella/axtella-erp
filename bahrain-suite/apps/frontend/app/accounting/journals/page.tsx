import { ModuleDataPage } from '../../../components/ModuleDataPage';

export default function ManualJournalsPage() {
  return (
    <ModuleDataPage
      title="Journal entries"
      badge="General ledger"
      endpoint="/accounting/journals"
      description="Posted journal entries with full line detail. Filter by building with the Property control in the top bar. New journals are posted via the API (accountant/admin); revenue lines may carry an income channel tag for reporting."
    />
  );
}
