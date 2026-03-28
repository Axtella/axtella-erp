import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccessControlService } from '../access-control/access-control.service';
import { UserEntity } from '../access-control/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { AuthenticatedUser } from './interfaces/authenticated-user.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly accessControlService: AccessControlService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.userRepo
      .createQueryBuilder('u')
      .where('LOWER(u.email) = LOWER(:email)', { email: dto.email })
      .andWhere('u.is_active = true')
      .getOne();

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isValid = await bcrypt.compare(dto.password, user.passwordHash);
    if (!isValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const principal = await this.buildPrincipal(user);
    const accessToken = await this.jwtService.signAsync({
      sub: principal.userId,
      email: principal.email,
      tenantId: principal.tenantId,
      roles: principal.roles,
      permissions: principal.permissions,
    });

    return {
      access_token: accessToken,
      user: principal,
      token_type: 'Bearer',
      expires_in: process.env.JWT_EXPIRES_IN || '1d',
    };
  }

  async me(userId: string): Promise<AuthenticatedUser> {
    const user = await this.userRepo.findOne({ where: { id: userId, isActive: true } });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return this.buildPrincipal(user);
  }

  private async buildPrincipal(user: UserEntity): Promise<AuthenticatedUser> {
    const roles = await this.accessControlService.getRolesForUser(user.id);
    const permissions = await this.accessControlService.getPermissionsForUser(user.id);
    return {
      userId: user.id,
      email: user.email,
      tenantId: user.tenantId ?? null,
      roles,
      permissions,
    };
  }
}
