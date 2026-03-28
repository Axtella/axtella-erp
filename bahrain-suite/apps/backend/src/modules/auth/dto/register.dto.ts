import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'user@example.com' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail({ allow_utf8_local_part: true })
  email: string;

  @ApiProperty({ example: 'changeme123', minLength: 8 })
  @IsString()
  @MinLength(8)
  password: string;
}
