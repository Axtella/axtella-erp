export const LOCALE_STORAGE_KEY = 'bp_locale';

export type UiLocale = 'en' | 'ar';

export function getStoredLocale(): UiLocale {
  if (typeof window === 'undefined') return 'en';
  const v = localStorage.getItem(LOCALE_STORAGE_KEY);
  return v === 'ar' ? 'ar' : 'en';
}

export function applyLocaleToDocument(locale: UiLocale): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.lang = locale === 'ar' ? 'ar' : 'en';
  root.dir = locale === 'ar' ? 'rtl' : 'ltr';
  root.dataset.locale = locale;
}

export function setStoredLocale(locale: UiLocale): void {
  localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  applyLocaleToDocument(locale);
}
