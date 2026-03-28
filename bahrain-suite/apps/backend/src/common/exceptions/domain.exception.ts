import { HttpException, HttpStatus } from '@nestjs/common';

export class DomainException extends HttpException {
  constructor(
    message: string,
    status: HttpStatus = HttpStatus.BAD_REQUEST,
    readonly code = 'DOMAIN_ERROR',
    readonly details?: Record<string, unknown>,
  ) {
    super({ message, code, details }, status);
  }
}
