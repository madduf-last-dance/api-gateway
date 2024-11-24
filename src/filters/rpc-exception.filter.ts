import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { Request, Response } from 'express';

@Catch()
export class CustomRpcExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.code ?? 400;
    const error = exception.message ?? exception;

    response
      .status(status)
      .json({
        error: error,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
  }
}
