"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.i18nConfig = void 0;
const i18nConfig = () => ({
    fallbackLocale: process.env.I18N_FALLBACK || 'en',
    supportedLocales: (process.env.I18N_SUPPORTED || 'en,ar')
        .split(',')
        .map((v) => v.trim())
        .filter(Boolean),
});
exports.i18nConfig = i18nConfig;
//# sourceMappingURL=i18n.config.js.map