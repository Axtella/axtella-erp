import { ModuleDataPage } from '../../components/ModuleDataPage';

export default async function Page() {
  return (
    <ModuleDataPage
      title="Notifications"
      endpoint="/notifications"
      description="Notification feed and delivery status for system events."
    />
  );
}
