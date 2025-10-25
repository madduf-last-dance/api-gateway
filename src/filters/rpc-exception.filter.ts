import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
  NotFoundException,
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Request, Response } from "express";
import { InjectMetric } from "@willsoto/nestjs-prometheus";
import { Counter } from "prom-client";

@Catch()
export class CustomRpcExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(CustomRpcExceptionFilter.name);

  constructor(
    @InjectMetric("http_request_total")
    private readonly httpCounter: Counter<string>,
  ) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Handle NotFoundException
    if (exception instanceof NotFoundException) {
      this.httpCounter.labels(request.url, request.method, "404").inc(1);

      const errorResponse = {
        error: "Not found page",
        statusCode: 404,
        timestamp: new Date().toISOString(),
        path: request.url,
      };

      this.logger.warn(`[404] ${request.method} ${request.url}`);
      response.status(404).json(errorResponse);
      return;
    }

    // Handle RPC or general errors
    const error = exception.getError ? exception.getError() : exception;

    // Detect ECONNREFUSED and similar connection-level issues
    const isConnectionRefused =
      (typeof error.status === "string" && error.status.includes("ECONNREFUSED")) ||
      (typeof error.message === "string" && error.message.includes("ECONNREFUSED"));

    const status =
      typeof error.status === "number" && error.status >= 100 && error.status <= 599
        ? error.status
        : isConnectionRefused
        ? HttpStatus.SERVICE_UNAVAILABLE
        : HttpStatus.BAD_REQUEST;

    const message = isConnectionRefused
      ? "Service unavailable — one of the microservices is down."
      : error.message || exception.message || "Internal server error";

    const errorResponse = {
      statusCode: status,
      message,
      error: error.error || error.name || "Unhandled error",
      timestamp: new Date().toISOString(),
      path: request.url,
    };

    // Log it
    this.logger.error(
      `[${status}] ${request.method} ${request.url} - ${message}`,
      typeof error === "object" ? JSON.stringify(error) : String(error),
    );

    // Record metrics
    this.httpCounter.labels(request.url, request.method, status.toString()).inc(1);

    // Respond safely
    response.status(status).json(errorResponse);
  }
}
