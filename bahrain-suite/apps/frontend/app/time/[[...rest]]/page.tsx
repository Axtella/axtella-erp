import {
  ModulePlaceholder,
  type ModulePlaceholderLink,
} from '../../../components/ModulePlaceholder';

const TIME_LINKS: ModulePlaceholderLink[] = [
  { href: '/attendance', label: 'Attendance' },
  { href: '/payroll', label: 'Payroll runs' },
  { href: '/reports', label: 'Reports' },
];

const MAP: Record<
  string,
  {
    title: string;
    description: string;
    hint?: string;
    relatedLinks?: ModulePlaceholderLink[];
  }
> = {
  '': {
    title: 'Time tracking',
    description:
      'Workforce time — Attendance is live; this hub will add projects and costing.',
    hint: 'Open Attendance for clock data and roster status today.',
    relatedLinks: TIME_LINKS,
  },
  projects: {
    title: 'Projects',
    description: 'Project-based time and cost allocation.',
    hint: 'Project costing will connect here after core attendance and payroll workflows.',
    relatedLinks: TIME_LINKS,
  },
};

export default function Page({ params }: { params: { rest?: string[] } }) {
  const key = params.rest?.join('/') ?? '';
  const conf = MAP[key] ?? MAP[''];
  return <ModulePlaceholder {...conf} />;
}
