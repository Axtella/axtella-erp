import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DEFAULT_LOCALE, SUPPORTED_LOCALES } from '../constants/locales.constant';

@Injectable()
export class LanguageInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const req = context.switchToHttp().getRequest();
    const tenantLang = req.headers['x-tenant-language'];
    const userLang = req.headers['x-user-language'];
    const acceptLang = req.headers['accept-language'];

    const pick = (raw: unknown): string | undefined => {
      const value = Array.isArray(raw) ? raw[0] : raw;
      if (typeof value !== 'string') return undefined;
      const code = value.split(',')[0]?.trim().toLowerCase();
      if (!code) return undefined;
      return SUPPORTED_LOCALES.includes(code as (typeof SUPPORTED_LOCALES)[number])
        ? code
        : undefined;
    };

    req.language =
      pick(tenantLang) ?? pick(userLang) ?? pick(acceptLang) ?? DEFAULT_LOCALE;
    return next.handle();
  }
}
