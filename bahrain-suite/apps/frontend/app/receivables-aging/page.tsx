import { ModuleDataPage } from '../../components/ModuleDataPage';

export default async function Page() {
  return (
    <ModuleDataPage
      title="Receivables Aging"
      endpoint="/receivables-aging"
      description="Aging analysis of outstanding receivables by tenant and period."
    />
  );
}
