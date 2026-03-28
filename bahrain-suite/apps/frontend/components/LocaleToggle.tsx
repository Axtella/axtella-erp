'use client';

import { useEffect, useState } from 'react';
import {
  getStoredLocale,
  setStoredLocale,
  type UiLocale,
} from '../lib/locale';

export function LocaleToggle({ className = '' }: { className?: string }) {
  const [locale, setLocale] = useState<UiLocale>('en');

  useEffect(() => {
    setLocale(getStoredLocale());
  }, []);

  function select(next: UiLocale) {
    setStoredLocale(next);
    setLocale(next);
  }

  return (
    <div
      className={`locale-toggle ${className}`.trim()}
      role="group"
      aria-label="Language"
    >
      <button
        type="button"
        className={`locale-toggle-btn${locale === 'en' ? ' locale-toggle-btn--active' : ''}`}
        aria-pressed={locale === 'en'}
        onClick={() => select('en')}
      >
        EN
      </button>
      <button
        type="button"
        className={`locale-toggle-btn${locale === 'ar' ? ' locale-toggle-btn--active' : ''}`}
        aria-pressed={locale === 'ar'}
        onClick={() => select('ar')}
      >
        عربي
      </button>
    </div>
  );
}
