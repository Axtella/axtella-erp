import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const payload = exception.getResponse();
    const message =
      typeof payload === 'object' && payload !== null && 'message' in payload
        ? String((payload as { message: string }).message)
        : 'Resource not found';

    response.status(404).json({
      statusCode: 404,
      error: 'Not Found',
      message,
      path: request.originalUrl,
      method: request.method,
      docsUrl: '/docs',
      timestamp: new Date().toISOString(),
    });
  }
}
