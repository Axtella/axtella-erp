import { LoginDto } from './dto/login.dto';
import { AuthService } from './auth.service';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: AuthenticatedUser;
        token_type: string;
        expires_in: string;
    }>;
    me(user: AuthenticatedUser): Promise<AuthenticatedUser>;
}
