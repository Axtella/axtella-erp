import {
  ConflictException,
  ForbiddenException,
  Injectable,
  ServiceUnavailableException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import type { JwtPayload } from './types/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  /** Used by UI (GET /auth/public-config) and register(). */
  allowsPublicRegistration(): boolean {
    const raw = this.config.get<string>('ALLOW_PUBLIC_REGISTER');
    if (raw === undefined || raw === null || raw.trim() === '') {
      return true;
    }
    const v = raw.toLowerCase().trim();
    return v !== '0' && v !== 'false' && v !== 'no' && v !== 'off';
  }

  private handleAuthDbError(err: unknown): never {
    if (err instanceof QueryFailedError) {
      const code = (err.driverError as { code?: string } | undefined)?.code;
      if (code === '42P01') {
        throw new ServiceUnavailableException(
          'Auth storage is not initialized (missing users table). From apps/backend run: npm run db:seed-dev-user. See docs/RUNBOOK.md.',
        );
      }
      if (code === '42501') {
        throw new ServiceUnavailableException(
          'Database denied access to the users table for DB_USERNAME. Grant SELECT, INSERT, and UPDATE on public.users (and USAGE on sequences if applicable).',
        );
      }
      if (code === '23505') {
        throw new ConflictException('Email already registered');
      }
    }
    throw err;
  }

  async register(dto: RegisterDto) {
    if (!this.allowsPublicRegistration()) {
      throw new ForbiddenException(
        'Public registration is disabled. Create users via DB seed, SQL, or an admin process.',
      );
    }
    let existing: User | null;
    try {
      existing = await this.usersRepo.findOne({
        where: { email: dto.email.toLowerCase() },
      });
    } catch (err) {
      this.handleAuthDbError(err);
    }
    if (existing) {
      throw new ConflictException('Email already registered');
    }
    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = this.usersRepo.create({
      email: dto.email.toLowerCase(),
      passwordHash,
      role: 'staff',
      isActive: true,
    });
    try {
      await this.usersRepo.save(user);
    } catch (err) {
      this.handleAuthDbError(err);
    }
    return this.buildAuthResponse(user);
  }

  async login(dto: LoginDto) {
    let user: User | null;
    try {
      user = await this.usersRepo.findOne({
        where: { email: dto.email.toLowerCase() },
      });
    } catch (err) {
      this.handleAuthDbError(err);
    }
    if (!user || !user.isActive) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.buildAuthResponse(user);
  }

  async validateUserById(userId: string): Promise<User | null> {
    return this.usersRepo.findOne({
      where: { id: userId, isActive: true },
    });
  }

  private buildAuthResponse(user: User) {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    };
  }
}
