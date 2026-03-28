import { ModulePlaceholder } from '../../components/ModulePlaceholder';

export default function AdminPage() {
  return (
    <ModulePlaceholder
      title="Admin workspace"
      description="Organization settings, users, and roles when this console is fully wired."
      hint="Roles (admin, accountant, staff, and others) are enforced by the API today. Dedicated admin UI screens will land here in a future release."
      relatedLinks={[
        { href: '/properties', label: 'Properties' },
        { href: '/data-import', label: 'Bulk import' },
        { href: '/', label: 'Dashboard' },
      ]}
    />
  );
}
