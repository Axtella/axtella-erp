import { ModulePlaceholder } from '../../components/ModulePlaceholder';

export default function HrPage() {
  return (
    <ModulePlaceholder
      title="HR workspace"
      description="Workforce policies and HR workflows. Payroll runs and attendance are available elsewhere today."
      hint="Use Payroll runs for pay periods and Attendance for clock data until dedicated HR screens ship."
      relatedLinks={[
        { href: '/payroll', label: 'Payroll runs' },
        { href: '/attendance', label: 'Attendance' },
        { href: '/', label: 'Dashboard' },
      ]}
    />
  );
}
