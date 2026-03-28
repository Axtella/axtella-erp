import { AxtellaWhiteLabel } from '../../components/branding';
import { ModuleDataPage } from '../../components/ModuleDataPage';
import { getPublicBrandModule } from '../../lib/brand-module-logos';

export default function Page() {
  const module = getPublicBrandModule();

  return (
    <ModuleDataPage
      title="AMC"
      endpoint="/amc"
      description="Annual maintenance contracts, service schedules, and coverage — live data when the API is connected."
      lead={
        <>
          <AxtellaWhiteLabel module={module} height={44} />
          <p className="subtitle module-brand-lead__copy">
            Module branding follows{' '}
            <code>NEXT_PUBLIC_BRAND_MODULE</code> (same
            tile as the top bar).
          </p>
        </>
      }
    />
  );
}
