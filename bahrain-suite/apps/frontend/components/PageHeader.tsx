export function PageHeader({
  title,
  description,
  badge,
}: {
  title: string;
  description?: string;
  badge?: string;
}) {
  return (
    <div className="page-header">
      {badge ? <span className="page-header-badge">{badge}</span> : null}
      <h1>{title}</h1>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
