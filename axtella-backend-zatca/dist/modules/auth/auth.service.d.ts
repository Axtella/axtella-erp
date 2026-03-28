import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { AccessControlService } from '../access-control/access-control.service';
import { UserEntity } from '../access-control/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';
export declare class AuthService {
    private readonly userRepo;
    private readonly jwtService;
    private readonly accessControlService;
    constructor(userRepo: Repository<UserEntity>, jwtService: JwtService, accessControlService: AccessControlService);
    login(dto: LoginDto): Promise<{
        access_token: string;
        user: AuthenticatedUser;
        token_type: string;
        expires_in: string;
    }>;
    me(userId: string): Promise<AuthenticatedUser>;
    private buildPrincipal;
}
