import { ModuleDataPage } from '../../components/ModuleDataPage';

export default async function Page() {
  return (
    <ModuleDataPage
      title="Government Payments"
      endpoint="/government-payments"
      description="Municipal and government payment obligations and history."
    />
  );
}
