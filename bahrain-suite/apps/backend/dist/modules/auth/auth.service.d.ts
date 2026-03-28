import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly usersRepo;
    private readonly jwtService;
    private readonly config;
    constructor(usersRepo: Repository<User>, jwtService: JwtService, config: ConfigService);
    allowsPublicRegistration(): boolean;
    private handleAuthDbError;
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
    validateUserById(userId: string): Promise<User | null>;
    private buildAuthResponse;
}
