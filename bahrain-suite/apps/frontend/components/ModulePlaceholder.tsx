import Link from 'next/link';
import { PageHeader } from './PageHeader';

export type ModulePlaceholderStatus = 'coming_soon' | 'preview';

export type ModulePlaceholderLink = { href: string; label: string };

type Props = {
  title: string;
  description: string;
  hint?: string;
  /** Default `coming_soon`: not built yet. `preview`: partial UI without full backend. */
  status?: ModulePlaceholderStatus;
  /** Overrides the default badge next to the page title (e.g. "Coming soon"). */
  badge?: string;
  /** Quick links at the bottom; defaults to Dashboard, Reports, Journals. */
  relatedLinks?: ModulePlaceholderLink[];
  /** Optional docs or help URL (opens same tab). */
  learnMoreUrl?: string;
  learnMoreLabel?: string;
};

const DEFAULT_LINKS: ModulePlaceholderLink[] = [
  { href: '/', label: 'Dashboard' },
  { href: '/reports', label: 'Reports' },
  { href: '/accounting/journals', label: 'Journal entries' },
];

export function ModulePlaceholder({
  title,
  description,
  hint,
  status = 'coming_soon',
  badge,
  relatedLinks,
  learnMoreUrl,
  learnMoreLabel = 'Learn more',
}: Props) {
  const resolvedBadge =
    badge ?? (status === 'preview' ? 'Preview' : 'Coming soon');
  const panelTitle =
    status === 'preview' ? 'Limited preview' : 'Not available yet';
  const panelLead =
    status === 'preview'
      ? 'You are viewing a preview of this area. Data and actions may be incomplete until this module is fully released.'
      : 'This module is planned for a future update. Your other Axtella tools below remain fully available.';

  const links = relatedLinks?.length ? relatedLinks : DEFAULT_LINKS;

  return (
    <div className="page-container">
      <PageHeader
        badge={resolvedBadge}
        title={title}
        description={description}
      />
      <section className="card module-placeholder-card">
        <div className="card-header module-placeholder-card-header">
          <span>{panelTitle}</span>
          <span className="module-placeholder-card-meta">{panelLead}</span>
        </div>
        <div className="card-body module-placeholder-card-body">
          {hint ? (
            <p className="module-placeholder-hint">{hint}</p>
          ) : (
            <p className="module-placeholder-lead">
              When this module goes live, you will manage it from this screen
              with the same sign-in and property controls you use elsewhere.
            </p>
          )}
          {learnMoreUrl ? (
            <p className="module-placeholder-learn-more">
              {learnMoreUrl.startsWith('http://') ||
              learnMoreUrl.startsWith('https://') ? (
                <a
                  href={learnMoreUrl}
                  className="inline-link"
                  target="_blank"
                  rel="noreferrer"
                >
                  {learnMoreLabel}
                </a>
              ) : (
                <Link href={learnMoreUrl} className="inline-link">
                  {learnMoreLabel}
                </Link>
              )}
            </p>
          ) : null}
          <div className="module-placeholder-actions">
            {links.map((l, i) => (
              <span key={l.href}>
                {i > 0 ? (
                  <span className="module-placeholder-dot" aria-hidden>
                    ·
                  </span>
                ) : null}
                <Link href={l.href} className="inline-link">
                  {l.label}
                </Link>
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
