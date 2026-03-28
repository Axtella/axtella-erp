import { ModuleDataPage } from '../../components/ModuleDataPage';

export default async function Page() {
  return (
    <ModuleDataPage
      title="Budget vs Actual"
      endpoint="/budget-vs-actual"
      description="Budget performance compared with actual results by period."
    />
  );
}
