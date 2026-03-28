export const i18nConfig = () => ({
  fallbackLocale: process.env.I18N_FALLBACK || 'en',
  supportedLocales: (process.env.I18N_SUPPORTED || 'en,ar')
    .split(',')
    .map((v) => v.trim())
    .filter(Boolean),
});
