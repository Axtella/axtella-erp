import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { AuthUser } from './types/jwt-payload.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    supportedRoles(): {
        roles: import("./user-role.enum").UserRole[];
    };
    publicConfig(): {
        allowPublicRegister: boolean;
    };
    register(dto: RegisterDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            role: string;
        };
    }>;
    me(user: AuthUser): AuthUser;
}
