import { ModuleDataPage } from '../../components/ModuleDataPage';

export default async function Page() {
  return (
    <ModuleDataPage
      title="Tenants"
      endpoint="/tenants"
      applyPropertyScope={false}
      description="Tenant profiles, occupancy details, and related account data."
    />
  );
}
