import type { ReactNode } from 'react';

export function StatusBanner({
  message,
  tone = 'error',
}: {
  message: ReactNode;
  tone?: 'error' | 'info';
}) {
  return <div className={`status-banner ${tone}`}>{message}</div>;
}
