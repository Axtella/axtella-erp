import { HttpException, HttpStatus } from '@nestjs/common';
export declare class DomainException extends HttpException {
    readonly code: string;
    readonly details?: Record<string, unknown>;
    constructor(message: string, status?: HttpStatus, code?: string, details?: Record<string, unknown>);
}
