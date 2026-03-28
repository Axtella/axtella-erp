import { ModuleDataPage } from '../../components/ModuleDataPage';

export default async function Page() {
  return (
    <ModuleDataPage
      title="Fixed Assets"
      endpoint="/fixed-assets"
      description="Fixed asset register and lifecycle movement information."
    />
  );
}
