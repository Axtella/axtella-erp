'use client';

import { useEffect, type ReactNode } from 'react';
import { applyLocaleToDocument, getStoredLocale } from '../lib/locale';

/** Syncs `<html lang dir>` from `localStorage` after load (see `LocaleToggle`). */
export function LocaleDocument({ children }: { children: ReactNode }) {
  useEffect(() => {
    applyLocaleToDocument(getStoredLocale());
  }, []);
  return <>{children}</>;
}
