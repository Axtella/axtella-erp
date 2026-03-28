import { ModuleDataPage } from '../../components/ModuleDataPage';

export default async function Page() {
  return (
    <ModuleDataPage
      title="Payables Aging"
      endpoint="/payables-aging"
      description="Aging view of payables and upcoming obligation timelines."
    />
  );
}
