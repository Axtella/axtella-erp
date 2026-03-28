import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Public } from './decorators/public.decorator';
import { CurrentUser } from './decorators/current-user.decorator';
import type { AuthUser } from './types/jwt-payload.interface';
import { ALL_ROLES } from './user-role.enum';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Get('supported-roles')
  @ApiOperation({ summary: 'List valid role values for RBAC (public reference)' })
  supportedRoles() {
    return { roles: ALL_ROLES };
  }

  @Public()
  @Get('public-config')
  @ApiOperation({
    summary: 'Public auth flags for the sign-in UI',
    description:
      'Use allowPublicRegister to show or hide “Create account” so it matches ALLOW_PUBLIC_REGISTER on the server.',
  })
  publicConfig() {
    return {
      allowPublicRegister: this.authService.allowsPublicRegistration(),
    };
  }

  @Public()
  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Create a staff account (public signup)',
    description:
      'Disabled when ALLOW_PUBLIC_REGISTER is 0/false/off/no (see backend .env).',
  })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login and receive JWT access token' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }

  @Get('me')
  @ApiBearerAuth('access-token')
  @ApiOperation({ summary: 'Current user from JWT' })
  me(@CurrentUser() user: AuthUser) {
    return user;
  }
}
