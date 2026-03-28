import { ModuleDataPage } from '../../../components/ModuleDataPage';

export default function DaybookPage() {
  return (
    <ModuleDataPage
      title="Daybook"
      badge="Chronological ledger"
      endpoint="/accounting/journals/daybook"
      description="Journal entries in date order. Use the Property control in the top bar to limit rows to one building, or All properties for the full ledger."
    />
  );
}
