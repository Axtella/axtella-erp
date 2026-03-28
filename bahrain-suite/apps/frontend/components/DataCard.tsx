import type { ReactNode } from 'react';

export function DataCard({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">{children}</div>
    </section>
  );
}
