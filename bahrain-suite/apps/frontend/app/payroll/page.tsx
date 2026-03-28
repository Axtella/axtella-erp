import { ModuleDataPage } from '../../components/ModuleDataPage';

export default async function Page() {
  return (
    <ModuleDataPage
      title="Payroll"
      endpoint="/payroll"
      applyPropertyScope={false}
      description="Payroll transactions, run previews, and allocation summaries."
    />
  );
}
