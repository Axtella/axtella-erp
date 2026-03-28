import { ModuleDataPage } from '../../components/ModuleDataPage';

export default async function Page() {
  return (
    <ModuleDataPage
      title="Investor Statements"
      endpoint="/investor-statements"
      description="Investor-level statement summaries and statement data preview."
    />
  );
}
