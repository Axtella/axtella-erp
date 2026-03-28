import { ModulePlaceholder } from '../../components/ModulePlaceholder';
import { SWAGGER_DOCS_URL } from '../../lib/api';

export default function DeveloperPage() {
  return (
    <ModulePlaceholder
      title="Developer workspace"
      description="API diagnostics and integration: use Swagger to try authenticated routes with your JWT."
      badge="Tools"
      hint="Sign in from the same host as this app, then open Swagger, Authorize with Bearer token, and call endpoints. Operators: see docs/RUNBOOK.md (Browser login and proxy)."
      learnMoreUrl={SWAGGER_DOCS_URL}
      learnMoreLabel="Open API docs (Swagger)"
      relatedLinks={[
        { href: '/login', label: 'Sign in' },
        { href: '/', label: 'Dashboard' },
      ]}
    />
  );
}
