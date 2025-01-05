import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from "@nestjs/common";
import { Request, Response } from 'express';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter, Histogram } from 'prom-client';
import { stat } from "fs";

@Catch()
export class CustomRpcExceptionFilter implements ExceptionFilter {
  constructor(
    @InjectMetric('http_request_total')
    private readonly httpCounter: Counter<string>,
  ) {}
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    if (exception instanceof NotFoundException){
      this.httpCounter.labels(request.url,request.method,'404').inc(1);
      response
        .status(404)
        .json({
          error: 'Not found page',
          statusCode: 404,
          timestamp: new Date().toISOString(),
          path: request.url,
        });
    } else {
      const status = exception.code ?? 400;
      const error = exception.message ?? exception;
      this.httpCounter.labels(request.url,request.method,status.toString()).inc(1);
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
}
