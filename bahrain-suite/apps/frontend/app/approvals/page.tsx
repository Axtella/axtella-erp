import { ModuleDataPage } from '../../components/ModuleDataPage';

export default async function Page() {
  return (
    <ModuleDataPage
      title="Approvals"
      endpoint="/approvals"
      description="Approval queues and decision history for submitted actions."
    />
  );
}
