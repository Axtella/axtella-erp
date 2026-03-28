"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LanguageInterceptor = void 0;
const common_1 = require("@nestjs/common");
const locales_constant_1 = require("../constants/locales.constant");
let LanguageInterceptor = class LanguageInterceptor {
    intercept(context, next) {
        const req = context.switchToHttp().getRequest();
        const tenantLang = req.headers['x-tenant-language'];
        const userLang = req.headers['x-user-language'];
        const acceptLang = req.headers['accept-language'];
        const pick = (raw) => {
            const value = Array.isArray(raw) ? raw[0] : raw;
            if (typeof value !== 'string')
                return undefined;
            const code = value.split(',')[0]?.trim().toLowerCase();
            if (!code)
                return undefined;
            return locales_constant_1.SUPPORTED_LOCALES.includes(code)
                ? code
                : undefined;
        };
        req.language =
            pick(tenantLang) ?? pick(userLang) ?? pick(acceptLang) ?? locales_constant_1.DEFAULT_LOCALE;
        return next.handle();
    }
};
exports.LanguageInterceptor = LanguageInterceptor;
exports.LanguageInterceptor = LanguageInterceptor = __decorate([
    (0, common_1.Injectable)()
], LanguageInterceptor);
//# sourceMappingURL=language.interceptor.js.map