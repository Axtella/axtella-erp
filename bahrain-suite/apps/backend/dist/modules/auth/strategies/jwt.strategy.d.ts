import { ConfigService } from '@nestjs/config';
import { Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';
import type { JwtPayload } from '../types/jwt-payload.interface';
declare const JwtStrategy_base: new (...args: [opt: import("passport-jwt").StrategyOptionsWithRequest] | [opt: import("passport-jwt").StrategyOptionsWithoutRequest]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly authService;
    constructor(config: ConfigService, authService: AuthService);
    validate(payload: JwtPayload): Promise<{
        userId: string;
        email: string;
        role: string;
    }>;
}
export {};
