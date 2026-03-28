import { ModuleDataPage } from '../../components/ModuleDataPage';

export default async function Page() {
  return (
    <ModuleDataPage
      title="Bank Reconciliation"
      endpoint="/bank-reconciliation"
      description="Reconciliation status and matching summary against bank activity."
    />
  );
}
